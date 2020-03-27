const { gql } = require('apollo-server')
const GraphQLJSON = require('graphql-type-json')

const typeDef = gql`
  input UserInput {
    id: ID
    name: String
    email: String
    handle: String
    password: String
  }

  type User {
    id: ID!
    name: String
    email: String
    handle: String
    password: String
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
    findUsers(filter: JSON!): [User]
    currentUser: User
    isAuth: Boolean
  }

  extend type Mutation {
    createUser(user: UserInput!): User
    signup(user: UserInput!): User
    login(email: String!, password: String!): User
    logout: Boolean
  }
`

module.exports = {
  typeDef,
}
