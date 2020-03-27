import React from 'react'
import styled, { css } from 'styled-components'
import { Card, Input, Button, Layout } from 'antd'
const { Header, Content, Sider } = Layout

const primaryColor = '#1890ff'

export const LoginContainer = styled.div`
  height: 100%;
  position: relative;
`

export const LoginCard = styled(Card)`
  position: absolute;
  width: 640px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 24px;
`

export const TwInput = styled(Input)`
  border-radius: 8px;
  height: 40px;
`

export const Title = styled.h1`
  color: ${primaryColor};
`

export const TwButton = styled(Button)`
  border-radius: 8px;
  height: 40px;
`

export const TweetButton = styled(TwButton)`
  font-weight: bold;
`

export const HomeContainer = styled(Card)`
  width: 100%;
  border-radius: 24px;
  margin: 32px 0;
  height: calc(100vh - 64px);
  position: relative;
`

export const LoaderContainer = styled.div`
  width: 100%;
  text-align: center;
`

export const UserDetails = styled.div`
  text-align: center;
`

export const TwitterContent = styled(Content)`
  max-width: 720px;
  min-width: 720px;
  margin: 0 auto;
  height: 100vh;
`

export const FormError = styled.span`
  font-size: 0.6rem;
`

export const TopPanel = styled.span`
  position: absolute;
  right: 24px;
  top: 32px;
  z-index: 1;
`

export const TweetContainer = styled.div`
  height: calc(100vh - 180px);
  overflow: auto;
`

export const UserTitle = styled.a`
  margin: 0px;
  font-size: 1.2rem;
`
