import React, { useState } from 'react'
import { HomeContainer, TopPanel } from '../theme'
import Loader from '../components/Loader'
import TweetBox from '../components/TweetBox'
import TweetList from '../components/TweetList'
import CommentBox from '../components/CommentBox'
import { UserOutlined } from '@ant-design/icons'
import { Tabs, List, Avatar, Divider, Button } from 'antd'
import {
  useGetUsers,
  useCreateTweet,
  useGetAllTweets,
  useLogout,
} from '../hooks/dataSource'
import { GET_ALL_TWEETS } from '../resources/queries'
import moment from 'moment'
import {
  TwitterOutlined,
  SmileFilled,
  PoweroffOutlined,
} from '@ant-design/icons'

const { TabPane } = Tabs

function UserList(props) {
  const { onUserTap } = props
  const { loading, error, data } = useGetUsers()
  if (loading) return <Loader />
  if (error) return <p>error...</p>
  const { users } = data
  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={<a onClick={() => onUserTap(item)}>{item.name}</a>}
            description={`@${item.handle}`}
          />
        </List.Item>
      )}
    />
  )
}

function FeedWall(props) {
  const { routeTo } = props
  const [visible, setVisibility] = useState(false)
  const [tweet, setTweet] = useState(null)
  const [comment, setComment] = useState('')
  const { loading, error, data } = useGetAllTweets()
  const queriesToRefetch = [{ query: GET_ALL_TWEETS }]
  const [
    saveTweet,
    { loading: savingComment, error: commentError, data: coment },
  ] = useCreateTweet(queriesToRefetch, () => {
    setVisibility(false)
    setTweet('')
  })

  const handleOk = e => setVisibility(false)
  const handleCancel = e => setVisibility(false)

  if (loading) return <Loader />
  if (error) return <p>error...</p>

  const { tweets } = data
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
        tweets={tweets}
        onTap={tw => routeTo(`/tweet/${tw.id}`)}
        onCommentIconClick={tw => {
          setTweet(tw)
          setVisibility(true)
        }}
      />
    </>
  )
}

function HomeView(props) {
  const [tweet, setTweet] = useState('')
  const [logout, { loading: logginOut, error: logoutErr }] = useLogout(
    () => localStorage.clear(),
    () => props.history.push('/login')
  )
  const queriesToRefetch = [{ query: GET_ALL_TWEETS }]
  const [
    saveTweet,
    { loading, error, data },
  ] = useCreateTweet(queriesToRefetch, () => setTweet(''))
  return (
    <HomeContainer>
      <TopPanel>
        <a
          onClick={() =>
            props.history.push(`/user/${localStorage.getItem('twUserId')}`)
          }
        >
          {localStorage.getItem('twUserName')}{' '}
        </a>
        <Button
          type="link"
          danger
          icon={<PoweroffOutlined />}
          loading={logginOut}
          onClick={() => logout()}
        />
      </TopPanel>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <TwitterOutlined />
              Home
            </span>
          }
          key="1"
        >
          <div
            style={{
              height: 'calc(100vh - 180px)',
              overflow: 'auto',
            }}
          >
            <TweetBox
              loading={loading}
              value={tweet}
              onSubmit={() =>
                saveTweet({
                  userId: localStorage.getItem('twUserId'),
                  content: tweet,
                })
              }
              onTweetChange={value => setTweet(value)}
            />
            <Divider dashed />
            <FeedWall routeTo={props.history.push} />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <SmileFilled />
              Users
            </span>
          }
          key="2"
        >
          <UserList
            onUserTap={user => props.history.push(`/user/${user.id}`)}
          />
        </TabPane>
      </Tabs>
    </HomeContainer>
  )
}

export default HomeView
