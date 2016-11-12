import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import App from './components/App';
import Home from './components/Home';
import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={SignIn}/>
      <Route path="/register" component={SignUp}/>
    </Route>
  </Router>
)

export default routes
