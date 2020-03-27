const { User } = require('./User')
const { resolvers } = require('./resolvers')
const { typeDef } = require('./typeDef')

module.exports = {
  User,
  resolvers,
  typeDef,
}
