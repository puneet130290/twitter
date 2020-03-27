import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

const graphqlClient = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_SERVER}/graphql`,
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={graphqlClient}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
