import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { LoaderContainer } from '../theme'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Loader(props) {
  return (
    <LoaderContainer>
      <Spin indicator={antIcon} />
    </LoaderContainer>
  )
}

export default Loader
