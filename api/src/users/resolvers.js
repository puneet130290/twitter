const { User } = require('./User')

const resolvers = {
  Query: {
    users: async (_, __, { dataSources }) => await dataSources.usersDB.find(),
    user: async (_, { id }, { dataSources }) =>
      await dataSources.usersDB.findById(id),
    findUsers: async (_, { filter }, { dataSources }) =>
      await dataSources.usersDB.find(filter),
    currentUser: async (_, __, { getUser }) => getUser(),
    isAuth: async (_, __, { isAuthenticated }) => isAuthenticated(),
  },
  Mutation: {
    login: async (
      _,
      { email, password },
      { dataSources, authenticate, login }
    ) => {
      const { user } = await authenticate('graphql-local', {
        email,
        password,
      })
      await login(user)
      return user
    },
    logout: async (_, __, { logout }) => logout(),
    signup: async (_, { user }, { dataSources, login }) => {
      const existingUsers = await dataSources.usersDB.find()
      const userWithEmailAlreadyExists = !!existingUsers.find(
        u => u.email === user.email
      )
      if (userWithEmailAlreadyExists) {
        throw new Error('User with email already exists')
      }
      const newUser = await dataSources.usersDB.save(user)
      await login(newUser)
      return newUser
    },
    createUser: async (_, { user }, { dataSources }) =>
      await dataSources.usersDB.save(user),
  },
}

module.exports = {
  resolvers,
}
