import React from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'

import {
  GET_TWEETS,
  GET_USERS,
  GET_USER,
  GET_TWEET,
  FIND_TWEETS,
  GET_USER_TWEETS,
  GET_COMMENTS,
  GET_ALL_TWEETS,
  GET_CURRENT_USER,
} from '../resources/queries'
import { CREATE_TWEET, SIGNUP, LOGIN, LOGOUT } from '../resources/mutations'

//Query Hooks
export function useGetTweets(filter) {
  const { loading, error, data } = useQuery(GET_TWEETS, {
    variables: { filter },
  })
  return { loading, error, data }
}

export function useGetUsers() {
  const { loading, error, data } = useQuery(GET_USERS)
  return { loading, error, data }
}

export function useGetTweet(id) {
  const { loading, error, data } = useQuery(GET_TWEET, { variables: { id } })
  return { loading, error, data }
}

export function useFindTweets(filter) {
  const { loading, error, data } = useQuery(FIND_TWEETS, {
    variables: { filter },
  })
  return { loading, error, data }
}

export function useGetUser(id) {
  const { loading, error, data } = useQuery(GET_USER, { variables: { id } })
  return { loading, error, data }
}

export function useGetUserTweets(userId) {
  const { loading, error, data } = useQuery(GET_USER_TWEETS, {
    variables: { userId },
  })
  return { loading, error, data }
}

export function useGetComments(tweetId) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { tweetId },
  })
  return { loading, error, data }
}

export function useGetAllTweets() {
  const { loading, error, data } = useQuery(GET_ALL_TWEETS)
  return { loading, error, data }
}

export function useGetCurrentUser() {
  const [currentUser, { loading, error, data }] = useLazyQuery(
    GET_CURRENT_USER
  )
  return [currentUser, { loading, error, data }]
}

//Mutation Hooks
export function useCreateTweet(queriesToRefetch, reset) {
  const [createTweet, { loading, error, data }] = useMutation(CREATE_TWEET, {
    refetchQueries: () => {
      return queriesToRefetch
    },
    onCompleted: () => reset(),
  })

  const saveTweet = tweet => createTweet({ variables: { ...tweet } })

  return [saveTweet, { loading, error, data }]
}

export function useCreateComment(filter) {
  const [createTweet, { loading, error, data }] = useMutation(CREATE_TWEET, {
    refetchQueries: () => {
      return [
        {
          query: FIND_TWEETS,
          variables: { filter },
        },
      ]
    },
  })

  const saveComment = comment => createTweet({ variables: { ...comment } })

  return [saveComment, { loading, error, data }]
}

export function useSignup(showInfo, showError, redirect) {
  const [signup, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted: () => {
      redirect()
      showInfo()
    },
    onError: () => showError(),
  })
  const signupUser = user => signup({ variables: { ...user } })
  return [signupUser, { loading, error, data }]
}

export function useLogin(showError) {
  const [login, { loading, error, data }] = useMutation(LOGIN, {
    onError: () => showError(),
  })
  const loginUser = credentials => login({ variables: { ...credentials } })
  return [loginUser, { loading, error, data }]
}

export function useLogout(clearData, redirect) {
  const [logout, { loading, error, data }] = useMutation(LOGOUT, {
    onCompleted: () => {
      clearData()
      redirect()
    },
  })
  return [logout, { loading, error, data }]
}
