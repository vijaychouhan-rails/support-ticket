import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import App from './components/App';
import Home from './components/Home';
import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';
import CustomerDashboard from './containers/customer/Dashboard';
import NewTicket from './containers/customer/NewTicket';
import Tickets from './containers/customer/Tickets';
import * as routesPath from './constants/routes';

import {requireAuthentication} from './containers/AuthenticatedComponent';
import {checkAccessLevel} from './containers/PermissionComponent';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path={routesPath.LOGIN} component={checkAccessLevel(SignIn)}/>
      <Route path={routesPath.REGISTER} component={checkAccessLevel(SignUp)}/>
      <Route path={routesPath.CUSTOMER_DASHBOARD} component={requireAuthentication(CustomerDashboard)}/>
      <Route path={routesPath.NEW_TICKET} component={requireAuthentication(NewTicket)}/>
      <Route path={routesPath.TICKETS} component={requireAuthentication(Tickets)}/>
    </Route>
  </Router>
)

export default routes
