const {
  ApolloServer,
  gql,
  AuthenticationError,
} = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const bcrypt = require('bcrypt')
const redis = require('redis')
const uuid = require('uuid/v4')
const passport = require('passport')
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport')

const { typeDefs, dataSources, resolvers } = require('./entities')

if (process.env.NODE_ENV !== 'production') {
  var dotenv = require('dotenv')
  dotenv.config()
}

const { PORT, MONGODB_URI, REDIS_URL } = process.env
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient(REDIS_URL)

const SESSION_SECRECT = 'bad secret'

const mongoose = require('mongoose')
const typeDef = gql`
  type Query
  type Mutation
`

passport.serializeUser(async (user, done) => {
  console.log('=============================SerializeUser called')
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  console.log(
    '=============================DeserializeUser called on: ',
    user._id
  )
  done(null, user)
})

let isConnected
const connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection')
    return Promise.resolve()
  }
  console.log('=> using new database connection')
  return mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(db => {
      isConnected = db.connections[0].readyState
    })
}

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    let error = null
    const [user] = await dataSources.usersDB.find({ email })
    if (!user) {
      error = new Error('no matching user')
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      error = new Error('incorrect password')
    }
    done(error, user)
  })
)

const app = express()

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs,
  dataSources: () => dataSources,
  resolvers,
  formatError: error => {
    console.log(JSON.stringify(error))
    return error
  },
  context: ({ req, res }) => buildContext({ req, res }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
})

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

app.use((req, res, next) => {
  connectToDatabase()
    .then(() => next())
    .catch(error => {
      throw error
    })
})
app.use(cors(corsOptions))

server.applyMiddleware({ app, cors: false })

app.use((error, req, res, next) => {
  throw error
  res.status(500).send(error)
})

const port = PORT || 4000

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}{server.graphqlPath}`
  )
)

module.exports = app
