import { gql } from 'apollo-boost'

export const CREATE_TWEET = gql`
  mutation CreateTweet($content: String, $userId: ID, $commentedOn: ID) {
    tweet: createTweet(
      tweet: { userId: $userId, content: $content, commentedOn: $commentedOn }
    ) {
      userId
    }
  }
`

export const SIGNUP = gql`
  mutation Signup(
    $name: String
    $email: String
    $handle: String
    $password: String
  ) {
    user: signup(
      user: {
        name: $name
        email: $email
        handle: $handle
        password: $password
      }
    ) {
      name
      email
      handle
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    user: login(email: $email, password: $password) {
      id
      name
      email
      handle
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    res: logout
  }
`
