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
    ) =>
      await dataSources.usersDB.login(
        { email, password },
        authenticate,
        login
      ),
    signup: async (_, { user }, { dataSources }) =>
      await dataSources.usersDB.signup(user),
    logout: async (_, __, { logout }) => logout(),
    createUser: async (_, { user }, { dataSources }) =>
      await dataSources.usersDB.save(user),
  },
}

module.exports = {
  resolvers,
}
