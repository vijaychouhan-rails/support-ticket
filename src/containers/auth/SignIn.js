import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/auth';
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
    return(
      <div className={`margin-bottom-20 ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <div className='input-group'>
          <span className="input-group-addon"><i className={field.spanClassName}></i></span>
          <input {...field.input} type={field.inputType} className='form-control' placeholder={field.placeholder}/>
        </div>
        {field.meta.touched &&  field.meta.error &&  <span className="control-label">{field.meta.error}</span>}
      </div>
    )
  }

  handleSubmit({email, password}) {  
    this.props.authActions.createSession({email, password})
  }

  render() {
    const { handleSubmit, isSubmitting, auth } = this.props;
    return (
      <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div className="panel panel-info" >
          <div className="panel-heading">
            <div className="panel-title">Sign In</div>
          </div>
          <div  className="panel-body" >
            { auth.getIn(['errors']) && <div id="login-alert" className="alert alert-danger col-sm-12"> { auth.getIn(['errors']) } </div>
            }
            
            <form onSubmit={handleSubmit(this.handleSubmit)} >
              <Field name="email" component={this.renderField} inputType='text' placeholder="Email address" spanClassName='glyphicon glyphicon-envelope'/>

              <Field name="password" className='' component={this.renderField} inputType='password' ref='password' placeholder="Password" spanClassName='glyphicon glyphicon-lock'/>
             
              <div className="form-group">
                <div className="col-sm-12 controls">
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
    authActions: bindActionCreators(AuthActions, dispatch)
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
