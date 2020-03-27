const DataSource = require('../utils/DataSource')
const mongoose = require('mongoose')

class Tweet extends DataSource {
  constructor() {
    super()
    this.model = {
      name: 'Tweet',
      schema: {
        id: String,
        content: String,
        userId: { type: this.Schema.ObjectId, ref: 'User' },
        isComment: Boolean,
        commentedOn: { type: this.Schema.ObjectId, ref: 'Tweet' },
      },
    }
  }

  getTweetAgg() {
    try {
      const agg = [
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'tweets',
            localField: '_id',
            foreignField: 'commentedOn',
            as: 'comments',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'tweeters',
          },
        },
      ]
      return agg
    } catch (error) {
      throw error
    }
  }

  formatResponse(res) {
    try {
      return res.map(tweet => {
        return {
          id: tweet._id,
          content: tweet.content,
          user: tweet.tweeters[0] && tweet.tweeters[0].name,
          userId: tweet.tweeters[0] && tweet.tweeters[0]._id,
          userHandle: tweet.tweeters[0] && tweet.tweeters[0].handle,
          totalComments: tweet.comments.length,
          createdAt: tweet.createdAt,
        }
      })
    } catch (error) {
      throw error
    }
  }

  async getUserTweets(userId) {
    try {
      const response = await this.Model.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        ...this.getTweetAgg(),
      ])
      return this.formatResponse(response)
    } catch (error) {
      throw error
    }
  }

  async getAllTweets() {
    try {
      const response = await this.Model.aggregate(this.getTweetAgg())
      return this.formatResponse(response)
    } catch (error) {
      throw error
    }
  }

  async getComments(tweetId) {
    try {
      const response = await this.Model.aggregate([
        { $match: { commentedOn: mongoose.Types.ObjectId(tweetId) } },
        ...this.getTweetAgg(),
      ])
      return this.formatResponse(response)
    } catch (error) {
      throw error
    }
  }

  async getTweet(id) {
    try {
      const response = await this.Model.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        ...this.getTweetAgg(),
      ])
      const [tweet] = this.formatResponse(response)
      return tweet || {}
    } catch (error) {
      throw error
    }
  }
}

module.exports = {
  Tweet,
}
