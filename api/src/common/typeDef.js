const { gql } = require('apollo-server')
const GraphQLJSON = require('graphql-type-json')

const typeDef = gql`
  scalar JSON
  scalar Date

  type Response {
    success: Boolean!
    message: String
  }
`

module.exports = {
  typeDef,
}
