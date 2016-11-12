import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { isClientSide } from '../utils/customHelper'

export function requireAuthentication(WrappedComponent) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
          this.checkAuth(this.props.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if(isClientSide()){
              if (!isAuthenticated) {
                  const redirectAfterLogin = this.props.location.pathname;
                  browserHistory.push(`/login?redirect=${redirectAfterLogin}`);
              }
            }
        }

        render () {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => ({
        isAuthenticated: state.getIn(['auth', 'signedIn']),
        test: state
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}
