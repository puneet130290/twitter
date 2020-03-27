import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { Row, Col, Card, message } from 'antd'
import { Redirect } from 'react-router-dom'
import { HOME_VIEW } from '../resources/routeNames'
import { useLogin } from '../hooks/dataSource'

import { LoginContainer, LoginCard } from '../theme'

function LoginView(props) {
  const [loginUser, { loading, error, data }] = useLogin(() =>
    message.error('Something went wrong!')
  )

  if (data && data.user) {
    const {
      user: { id, name, email, handle },
    } = data
    localStorage.setItem('twUserId', id)
    localStorage.setItem('twUserHandle', handle)
    localStorage.setItem('twUserEmail', email)
    localStorage.setItem('twUserName', name)

    return <Redirect to={{ pathname: '/home' }} />
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Row span={24}>
          <Col span={12}>
            <img
              style={{ height: '200px', marginTop: 32 }}
              src="/assets/img/login.png"
              alt="image"
            />
          </Col>
          <Col span={12}>
            <LoginForm
              routeTo={props.history.push}
              onSubmit={values => loginUser(values)}
              loading={loading}
            />
          </Col>
        </Row>
      </LoginCard>
    </LoginContainer>
  )
}

export default LoginView
