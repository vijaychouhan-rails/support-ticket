import React from 'react'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import App from './components/App';
import Home from './components/Home';
import NotAuthorizeComponent from './components/NotAuthorize'
import NotFoundComponent from './components/NotFound'
import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';
import CustomerDashboard from './containers/customer/Dashboard';
import NewTicket from './containers/customer/NewTicket';
import Tickets from './containers/customer/Tickets';
import AgentDashboard from './containers/agent/Dashboard';
import * as routesPath from './constants/routes';

import {requireAuthentication} from './containers/AuthenticatedComponent';
import {checkAccessLevel} from './containers/PermissionComponent';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} component={Home}/>
      <Route path={routesPath.LOGIN} component={checkAccessLevel(SignIn)}/>
      <Route path={routesPath.REGISTER} component={checkAccessLevel(SignUp)}/>
      <Route path={routesPath.CUSTOMER_DASHBOARD} authorize={['customer']} component={checkAccessLevel(requireAuthentication(CustomerDashboard))}/>
      <Route path={routesPath.NEW_TICKET} authorize={['customer']} component={checkAccessLevel(requireAuthentication(NewTicket))}/>
      <Route path={routesPath.TICKETS} authorize={['customer']} component={checkAccessLevel(requireAuthentication(Tickets))}/>
      <Route path={routesPath.AGENT_DASHBOARD} authorize={['agent']} component={checkAccessLevel(requireAuthentication(AgentDashboard))}/>
      <Route path={routesPath.NOT_AUTHORIZE} component={NotAuthorizeComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Route>
  </Router>
)

export default routes
