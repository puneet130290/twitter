const { gql } = require('apollo-server')
const GraphQLJSON = require('graphql-type-json')

const typeDef = gql`
  input TweetInput {
    id: ID
    content: String
    userId: ID
    isComment: Boolean
    commentedOn: ID
    createdAt: Date
    updatedAt: Date
  }

  type Tweet {
    id: ID!
    content: String
    userId: ID
    isComment: Boolean
    commentedOn: ID
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    userTweets(userId: ID!): [JSON]
    comments(tweetId: ID!): [JSON]
    tweets: [JSON]
    tweet(id: ID!): JSON
    findTweets(filter: JSON!): [Tweet]
  }

  extend type Mutation {
    createTweet(tweet: TweetInput!): Tweet
  }
`

module.exports = {
  typeDef,
}
