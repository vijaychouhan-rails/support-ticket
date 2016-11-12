import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import { Field, reduxForm } from 'redux-form/immutable'
import { browserHistory, Link } from 'react-router';
import _ from 'lodash';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  
  return errors
}

export class SignIn extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderField(field) {
    var inputType = field.inputType ? field.inputType : 'text' 

    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <input {...field.input} type={inputType} className={`form-control ${field.className}`} placeholder={field.placeholder}/>
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  handleSubmit({email, password}) {      
    // this.props.authActions.createSession({email, password})
  }

  render() {
    const { handleSubmit, isSubmitting, auth } = this.props;
    return (
      <div className="jumbotron center-block">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className="form-group">
            <Field name="email" className='' component={this.renderField} inputType='' placeholder="Email"/>
          </div>

          <div className="form-group">
            <Field name="password" className='' component={this.renderField} inputType='password' ref='password' placeholder="Password" placeholder="Password"/>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default" disabled={isSubmitting}>Login</button>
          </div>
        </form>
          <div className='error-message'>{auth.getIn(['errors'])}</div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    auth: state.getIn(['auth']),
    isSubmitting: state.getIn(['auth', 'submitting'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // authActions: bindActionCreators(AuthActions, dispatch)
  }
}

SignIn = reduxForm({
  form: 'SignInForm',
  asyncValidating: true,
  validate
})(SignIn);

SignIn.propTypes = {
  router: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
