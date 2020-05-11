import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import './views/styles.css'
import { TwitterContent } from './theme'
import { withRouter } from 'react-router-dom'

import routes, { publicRoutes } from './routes'
import { useGetCurrentUser } from './hooks/dataSource'

import { Layout, Menu, Breadcrumb } from 'antd'
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

function App(props) {
  const [isAuth, setAuth] = useState(false)
  const [currentUser, { loading, error, data }] = useGetCurrentUser()

  useEffect(() => {
    console.log('check auth status here')
  }, [props.location.pathname])
  return (
    <Layout>
      <TwitterContent>
        {!!localStorage.getItem('twUserId') ? routes() : publicRoutes()}
      </TwitterContent>
    </Layout>
  )
}

export default withRouter(App)
