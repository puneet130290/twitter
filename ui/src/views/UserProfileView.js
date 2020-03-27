import React, { useState } from 'react'
import { Avatar, PageHeader, Divider } from 'antd'
import Loader from '../components/Loader'
import { UserOutlined } from '@ant-design/icons'
import {
  useGetUser,
  useGetUserTweets,
  useCreateTweet,
} from '../hooks/dataSource'
import TweetList from '../components/TweetList'
import CommentBox from '../components/CommentBox'

import { HomeContainer, Title, UserDetails } from '../theme'

import { GET_USER_TWEETS } from '../resources/queries'

function UserTweets(props) {
  const { userId, routeTo } = props
  const { loading, error, data } = useGetUserTweets(userId)

  const [tweet, setTweet] = useState(null)
  const [visible, setVisibility] = useState(false)
  const [comment, setComment] = useState('')
  const queriesToRefetch = [{ query: GET_USER_TWEETS, variables: { userId } }]
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

  const { userTweets } = data

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
        tweets={userTweets}
        onTap={tw => routeTo(`/tweet/${tw.id}`)}
        onCommentIconClick={tw => {
          setTweet(tw)
          setVisibility(true)
        }}
      />
    </>
  )
}

function UserProfileView(props) {
  const { loading, error, data } = useGetUser(props.match.params.id)

  if (loading) return <Loader />
  if (error) return <p>error...</p>

  const {
    user: { id, name, handle },
  } = data

  return (
    <HomeContainer>
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.goBack()}
        title="User"
      />
      <Divider style={{ margin: 0, marginBottom: 16 }} />
      <div style={{ height: 'calc(100vh - 180px)', overflow: 'auto' }}>
        <UserDetails>
          <Avatar size={64} icon={<UserOutlined />} />
          <Title>{name}</Title>
          <p
            style={{ margin: 0, color: 'rgba(0, 0, 0, 0.45)' }}
          >{`@${handle}`}</p>
        </UserDetails>
        <Divider dashed />
        <UserTweets
          userId={props.match.params.id}
          routeTo={props.history.push}
        />
      </div>
    </HomeContainer>
  )
}

export default UserProfileView
