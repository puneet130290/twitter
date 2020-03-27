import React from 'react'
import moment from 'moment'
import { UserOutlined, MessageTwoTone } from '@ant-design/icons'
import { HomeContainer, Title, UserTitle } from '../theme'
import { Avatar, Row, Col } from 'antd'

function Tweet(props) {
  const {
    tweet: { user, userHandle, createdAt, content, totalComments, userId },
    onCommentIconClick,
    onUserClick,
  } = props

  return (
    <>
      <Row style={{ marginBottom: 8 }}>
        <Col span={3}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Col>
        <Col>
          <UserTitle onClick={() => onUserClick(userId)}>{user}</UserTitle>
          <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.45)' }}>
            {userHandle}
          </p>
        </Col>
      </Row>
      <h1 style={{ margin: 0 }}>{content}</h1>
      <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.45)' }}>
        {`${moment(createdAt).format('h:mm A')} . ${moment(createdAt).format(
          'MMM DD, YYYY'
        )}`}
      </p>
      <div style={{ paddingTop: 8 }}>
        <span
          onClick={() =>
            onCommentIconClick({ user, userHandle, createdAt, totalComments })
          }
        >
          <MessageTwoTone /> {totalComments}
        </span>
      </div>
    </>
  )
}

export default Tweet
