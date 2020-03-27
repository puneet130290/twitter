import React from 'react'
import { Modal, Row, Col, Avatar } from 'antd'
import moment from 'moment'
import { UserOutlined } from '@ant-design/icons'
import { Title } from '../theme'

import TweetBox from './TweetBox'

function CommentBox(props) {
  const {
    visible,
    onOk,
    onCancel,
    tweet,
    comment,
    onCommentSubmit,
    onCommentChange,
    loading,
  } = props
  return (
    <Modal
      title={null}
      footer={null}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Row style={{ marginBottom: 8 }}>
        <Col span={4}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Col>
        <Col>
          <Title style={{ margin: 0 }}>{tweet && tweet.user}</Title>
          <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.45)' }}>
            {tweet && tweet.userHandle}
          </p>
        </Col>
      </Row>
      <h1 style={{ margin: 0 }}>{tweet && tweet.content}</h1>
      <p style={{ margin: 0, marginBottom: 16, color: 'rgba(0, 0, 0, 0.45)' }}>
        {`${moment(tweet && tweet.createdAt).format('h:mm A')} . ${moment(
          tweet && tweet.createdAt
        ).format('MMM DD, YYYY')}`}
      </p>
      <TweetBox
        onSubmit={() => onCommentSubmit()}
        onTweetChange={value => onCommentChange(value)}
        value={comment}
        loading={loading}
      />
    </Modal>
  )
}

export default CommentBox
