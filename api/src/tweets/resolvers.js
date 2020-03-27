const { Tweet } = require('./Tweet')

const resolvers = {
  Query: {
    tweet: async (_, { id }, { dataSources }) =>
      await dataSources.tweetsDB.getTweet(id),
    userTweets: async (_, { userId }, { dataSources }) =>
      await dataSources.tweetsDB.getUserTweets(userId),
    comments: async (_, { tweetId }, { dataSources }) =>
      await dataSources.tweetsDB.getComments(tweetId),
    tweets: async (_, __, { dataSources }) =>
      await dataSources.tweetsDB.getAllTweets(),
  },
  Mutation: {
    createTweet: async (_, { tweet }, { dataSources }) =>
      await dataSources.tweetsDB.save(tweet),
  },
}

module.exports = {
  resolvers,
}
