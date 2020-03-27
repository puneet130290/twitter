import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import * as ROUTES from './resources/routeNames'

import LoginView from './views/LoginView'
import HomeView from './views/HomeView'
import SignupView from './views/SignupView'
import TweetView from './views/TweetView'
import UserProfileView from './views/UserProfileView'

export const publicRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={ROUTES.LOGIN_VIEW}
        render={props => <LoginView {...props} />}
      />
      <Route
        exact
        path={ROUTES.SIGNUP_VIEW}
        render={props => <SignupView {...props} />}
      />
      <Route
        exact
        path="*"
        render={props => <SignupView {...props} />}
        render={props => <Redirect to={{ pathname: ROUTES.LOGIN_VIEW }} />}
      />
    </Switch>
  )
}

const routes = () => {
  return (
    <Switch>
      <Route
        exact
        path={ROUTES.HOME_VIEW}
        render={props => <HomeView {...props} />}
      />
      <Route
        exact
        path={ROUTES.TWEET_VIEW}
        render={props => <TweetView {...props} />}
      />
      <Route
        exact
        path={ROUTES.USER_PROFILE_VIEW}
        render={props => <UserProfileView {...props} />}
      />
      <Route path="*" render={props => <Redirect to={ROUTES.HOME_VIEW} />} />
    </Switch>
  )
}

export const testRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={ROUTES.HOME_VIEW}
        render={props => <HomeView {...props} />}
      />
      <Route
        exact
        path={ROUTES.TWEET_VIEW}
        render={props => <TweetView {...props} />}
      />
      <Route
        exact
        path={ROUTES.USER_PROFILE_VIEW}
        render={props => <UserProfileView {...props} />}
      />
      <Route
        exact
        path={ROUTES.LOGIN_VIEW}
        render={props => <LoginView {...props} />}
      />
      <Route
        exact
        path={ROUTES.SIGNUP_VIEW}
        render={props => <SignupView {...props} />}
      />
    </Switch>
  )
}

export default routes
