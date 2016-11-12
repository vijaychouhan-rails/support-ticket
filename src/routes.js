import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import App from './components/App';
import Home from './components/Home';
import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';
import CustomerDashboard from './containers/customer/Dashboard';

import * as routesPath from './constants/routes';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path={routesPath.LOGIN} component={SignIn}/>
      <Route path={routesPath.REGISTER} component={SignUp}/>
      <Route path={routesPath.CUSTOMER_DASHBOARD} component={CustomerDashboard}/>
    </Route>
  </Router>
)

export default routes
