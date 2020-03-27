import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { TwInput, Title, TwButton } from '../theme'
import { SIGNUP_VIEW } from '../resources/routeNames'
import { FormError } from '../theme'

function LoginForm(props) {
  const { routeTo, onSubmit, loading } = props

  const onFinish = values => onSubmit(values)

  return (
    <>
      <Title>Login</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: <FormError>The input is not valid E-mail!</FormError>,
            },
            {
              required: true,
              message: <FormError>Please input your E-mail!</FormError>,
            },
          ]}
        >
          <TwInput
            prefix={<MailOutlined style={{ marginTop: 8 }} />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: <FormError> Please input your Password!</FormError>,
            },
          ]}
          hasFeedback
        >
          <TwInput
            prefix={<LockOutlined style={{ marginTop: 8 }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            shape="round"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>{' '}
          Or <a onClick={() => routeTo(SIGNUP_VIEW)}>register now!</a>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
