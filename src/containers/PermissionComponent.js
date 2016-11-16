//This is WrappedComponent
//We are checking user authentication
//Customer can't access Agent page
//Agent can't access Customer page
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { isClientSide } from '../utils/customHelper'
import _ from 'lodash'
import * as routesPath from '../constants/routes';

export function checkAccessLevel(WrappedComponent) {

    class PermissionComponent extends React.Component {
        // static propTypes = {
        //   routes: PropTypes.array.isRequired
        // };
        componentWillMount () {
          const { routes, userRole, isAuthenticated } = this.props;
          const roles = [].concat.apply([], routes.filter(function(n){ return n.authorize != undefined }).map(e => e.authorize))
          const matchedRole = _.includes(roles, userRole)
          if((roles.length != 0) && !matchedRole){
            browserHistory.push(routesPath.NOT_AUTHORIZE);
          } 
        }

        // checkAuth (isAuthenticated) {
        //     if(isClientSide()){
        //       if (isAuthenticated) {
        //           const redirectAfterLogin = this.props.location.pathname;
        //           browserHistory.push('/');
        //       }
        //     }
        // }

        render () {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => ({
      isAuthenticated: state.getIn(['auth', 'signedIn']),
      userRole: state.getIn(['auth', 'userType'])
    });

    return connect(mapStateToProps)(PermissionComponent);
}
