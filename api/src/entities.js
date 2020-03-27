const { gql } = require('apollo-server')

const users = require('./users')
const tweets = require('./tweets')
const common = require('./common/typeDef')

const { User } = users
const { Tweet } = tweets

const typeDef = gql`
  type Query
  type Mutation
`

const dataSources = {
  usersDB: new User(),
  tweetsDB: new Tweet(),
}

const resolvers = [users.resolvers, tweets.resolvers]

const typeDefs = [typeDef, common.typeDef, users.typeDef, tweets.typeDef]

module.exports = {
  typeDefs,
  dataSources,
  resolvers,
}
