const { Tweet } = require('./Tweet')
const { resolvers } = require('./resolvers')
const { typeDef } = require('./typeDef')

module.exports = {
  Tweet,
  resolvers,
  typeDef,
}
