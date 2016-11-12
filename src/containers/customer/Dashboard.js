import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { browserHistory, Link } from 'react-router';
import _ from 'lodash';

export class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div> 
        Customer Dashboard
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
