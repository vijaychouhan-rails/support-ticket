import React from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
// import { RESET_AUTH_ERROR } from '../../constants/types';

import { Field, reduxForm } from 'redux-form/immutable'

import _ from 'lodash';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  } else if(values.email.length > 50){
    errors.email = 'Max 50 char'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if(values.password.length > 50){
    errors.password = 'Max 50 char'
  } else if(values.password.length < 8){
    errors.password = 'Minimum 8 char'
  }

  if (!values.name) {
    errors.name = 'Required'
  } else if(values.name.length > 50){
    errors.name = 'Max 50 char'
  }

  return errors
}

export class SignUp extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    //resetting the error in auth
   // this.props.dispatch({ type: RESET_AUTH_ERROR })
  }

  renderField(field) {
    var options = {}
    var maxLengthOpt = (field.maxLength ? {maxLength: field.maxLength} : {})
    options = _.merge({}, options, maxLengthOpt)
    return(
      <div className={`margin-bottom-20 ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <div className='input-group'>
          <span className="input-group-addon"><i className={field.spanClassName}></i></span>
          <input {...field.input} type={field.inputType} className='form-control' placeholder={field.placeholder} {...options}/>
        </div>
        {field.meta.touched &&  field.meta.error &&  <span className="control-label">{field.meta.error}</span>}
      </div>
    )
  }

  handleSubmit({email, password, name}) {
    this.props.authActions.createUser({email, password, name})
  }

  render() {
    const { handleSubmit, isSubmitting, auth } = this.props;
    return (
      <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div className="panel panel-info" >
          <div className="panel-heading">
            <div className="panel-title">Get Customer Account</div>
          </div>
          <div  className="panel-body" >
            { auth.getIn(['errors']) && <div id="login-alert" className="alert alert-danger col-sm-12"> { auth.getIn(['errors']) } </div>
            }
            <form onSubmit={handleSubmit(this.handleSubmit)} >
              <Field name="email" component={this.renderField} inputType='text' placeholder="Email address" spanClassName='glyphicon glyphicon-envelope' maxLength='50'/>

              <Field name="password" className='' component={this.renderField} inputType='password' ref='password' placeholder="Password" spanClassName='glyphicon glyphicon-lock' />

              <Field name="name" className='' component={this.renderField} inputType='te' placeholder='Full Name' maxLength='50' spanClassName='glyphicon glyphicon-user'/>
             
              <div className="form-group">
                <div className="col-sm-12 controls">
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>Register</button>
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

SignUp = reduxForm({
  form: 'SignUpForm',
  asyncValidating: true,
  validate
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
