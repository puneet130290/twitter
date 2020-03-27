import React from 'react'
import moment from 'moment'
import { Avatar, Row, Col, Divider } from 'antd'
import { UserOutlined, MessageTwoTone } from '@ant-design/icons'

function TweetList(props) {
  const { tweets, onTap, onCommentIconClick } = props

  return (
    <>
      {tweets.map((tweet, index) => (
        <>
          <Row style={{ marginBottom: 8 }} key={tweet.id}>
            <Col span={2}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Col>
            <Col>
              <div className="tw-list-item" onClick={() => onTap(tweet)}>
                <h3 style={{ margin: 0 }}>
                  {tweet.user}{' '}
                  <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                    {`@${tweet.userHandle} . ${moment(tweet.createdAt).format(
                      'h:mm A'
                    )}`}
                  </span>
                </h3>
                <p style={{ margin: 0 }}>{tweet.content}</p>
              </div>
              <div>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => onCommentIconClick(tweet)}
                >
                  <MessageTwoTone /> {tweet.totalComments}
                </span>
              </div>
            </Col>
          </Row>
          {index + 1 !== tweets.length && <Divider />}
        </>
      ))}
    </>
  )
}

export default TweetList
