import React, { useState } from 'react'
import { PageHeader, Divider } from 'antd'

import { HomeContainer, TweetContainer } from '../theme'
import {
  useGetTweet,
  useCreateTweet,
  useGetComments,
} from '../hooks/dataSource'
import Loader from '../components/Loader'
import Tweet from '../components/Tweet'
import TweetList from '../components/TweetList'
import CommentBox from '../components/CommentBox'
import { GET_COMMENTS, GET_TWEET } from '../resources/queries'

function CommentList(props) {
  const { tweetId, routeTo } = props
  const [tweet, setTweet] = useState(null)
  const [visible, setVisibility] = useState(false)
  const [comment, setComment] = useState('')
  const { loading, error, data } = useGetComments(tweetId)
  const queriesToRefetch = [{ query: GET_COMMENTS, variables: { tweetId } }]

  const [
    saveTweet,
    { loading: savingComment, error: commentError },
  ] = useCreateTweet(queriesToRefetch, () => {
    setVisibility(false)
    setTweet('')
  })

  const handleOk = e => setVisibility(false)
  const handleCancel = e => setVisibility(false)

  if (loading) return <Loader />
  if (error) return <p>error...</p>

  const { comments } = data

  return (
    <>
      <CommentBox
        onCommentSubmit={() =>
          saveTweet({
            commentedOn: tweet && tweet.id,
            content: comment,
            userId: localStorage.getItem('twUserId'),
          })
        }
        onCommentChange={value => setComment(value)}
        comment={comment}
        loading={savingComment}
        visible={visible}
        tweet={tweet}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <TweetList
        tweets={comments}
        onTap={tw => routeTo(`/tweet/${tw.id}`)}
        onCommentIconClick={tw => {
          setTweet(tw)
          setVisibility(true)
        }}
      />
    </>
  )
}

function TweetView(props) {
  const { loading, error, data } = useGetTweet(props.match.params.id)
  const [tweet, setTweet] = useState(null)
  const [visible, setVisibility] = useState(false)
  const [comment, setComment] = useState('')

  const queriesToRefetch = [
    { query: GET_TWEET, variables: { id: props.match.params.id } },
    { query: GET_COMMENTS, variables: { tweetId: props.match.params.id } },
  ]

  const [
    saveTweet,
    { loading: savingComment, error: commentError },
  ] = useCreateTweet(queriesToRefetch, () => {
    setVisibility(false)
    setTweet('')
  })

  const handleOk = e => setVisibility(false)
  const handleCancel = e => setVisibility(false)

  if (loading) return <Loader />
  if (error) return <p>error...</p>

  const { tweet: userTweet } = data

  return (
    <HomeContainer>
      <CommentBox
        onCommentSubmit={() =>
          saveTweet({
            commentedOn: props.match.params.id,
            content: comment,
            userId: localStorage.getItem('twUserId'),
          })
        }
        onCommentChange={value => setComment(value)}
        comment={comment}
        loading={savingComment}
        visible={visible}
        tweet={tweet}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.goBack()}
        title="Tweet"
      />
      <Divider style={{ margin: 0, marginBottom: 16 }} />
      <TweetContainer>
        <Tweet
          tweet={userTweet}
          onCommentIconClick={tw => {
            setTweet(tw)
            setVisibility(true)
          }}
          onUserClick={id => props.history.push(`/user/${id}`)}
        />
        <Divider dashed />
        <CommentList
          tweetId={props.match.params.id}
          routeTo={props.history.push}
        />
      </TweetContainer>
    </HomeContainer>
  )
}

export default TweetView
