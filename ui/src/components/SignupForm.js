import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { TwInput, Title, TwButton, Register } from '../theme'
import { LOGIN_VIEW } from '../resources/routeNames'
import { FormError } from '../theme'

function Signup(props) {
  const { routeTo, onSubmit, loading } = props
  const onFinish = values => onSubmit(values)

  return (
    <>
      <Title>Register</Title>
      <Form
        name="Signup"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: <FormError>Please input your Name!</FormError>,
            },
          ]}
        >
          <TwInput
            prefix={<SmileOutlined style={{ marginTop: 8 }} />}
            placeholder="Full Name"
          />
        </Form.Item>
        <Form.Item
          name="handle"
          rules={[
            {
              required: true,
              message: <FormError>Please input your Username!</FormError>,
            },
          ]}
        >
          <TwInput
            prefix={<UserOutlined style={{ marginTop: 8 }} />}
            placeholder="Username"
          />
        </Form.Item>
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
        <Form.Item
          name="rePassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: <FormError>Please input your Password!</FormError>,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  <FormError>The passwords do not match!</FormError>
                )
              },
            }),
          ]}
        >
          <TwInput
            prefix={<LockOutlined style={{ marginTop: 8 }} />}
            type="password"
            placeholder="Re-Enter Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            shape="round"
            style={{ marginRight: 8 }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Register
          </Button>{' '}
          Or <a onClick={() => routeTo(LOGIN_VIEW)}>login</a>
        </Form.Item>
      </Form>
    </>
  )
}

export default Signup
