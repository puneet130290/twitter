import { gql } from 'apollo-boost'

export const GET_TWEETS = gql`
  query GetTweets($filter: JSON!) {
    tweets: tweets(filter: $filter)
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      handle
    }
  }
`

export const FIND_TWEETS = gql`
  query FindTweets($filter: JSON!) {
    tweets: findTweets(filter: $filter) {
      content
      createdAt
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user: user(id: $id) {
      id
      name
      handle
    }
  }
`

export const GET_USER_TWEETS = gql`
  query GetUserTweets($userId: ID!) {
    userTweets: userTweets(userId: $userId)
  }
`

export const GET_COMMENTS = gql`
  query GetComments($tweetId: ID!) {
    comments: comments(tweetId: $tweetId)
  }
`

export const GET_TWEET = gql`
  query GetTweet($id: ID!) {
    tweet: tweet(id: $id)
  }
`

export const GET_ALL_TWEETS = gql`
  query GetAllTweets {
    tweets: tweets
  }
`

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    user: currentUser {
      id
      name
      email
      handle
    }
  }
`
