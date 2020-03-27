import React from 'react'
import SignupForm from '../components/SignupForm'
import { Row, Col, Card, message } from 'antd'
import { useSignup } from '../hooks/dataSource'

import { LoginContainer, LoginCard } from '../theme'

function SignupView(props) {
  const [signupUser, { loading, error, data }] = useSignup(
    () => message.success('Registration Successful! Please Login.'),
    () => message.error('Something went wrong!'),
    () => props.history.push('/login')
  )

  return (
    <LoginContainer>
      <LoginCard>
        <Row span={24}>
          <Col span={12}>
            <img
              style={{ height: '180px', marginTop: 32 }}
              src="/assets/img/signup.png"
              alt="image"
            />
          </Col>
          <Col span={12}>
            <SignupForm
              routeTo={props.history.push}
              onSubmit={values => signupUser(values)}
              loading={loading}
            />
          </Col>
        </Row>
      </LoginCard>
    </LoginContainer>
  )
}

export default SignupView
