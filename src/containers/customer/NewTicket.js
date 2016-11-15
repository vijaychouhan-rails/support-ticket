import React from 'react';
import { connect } from 'react-redux';
import * as TicketActions from '../../actions/ticket';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable'

import _ from 'lodash';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.subject) {
    errors.subject = 'Required'
  } else if(values.subject.length > 50){
    errors.subject = 'Max 50 char'
  }

  if (!values.description) {
    errors.description = 'Required'
  } else if(values.description.length > 600){
    errors.description = 'Max 600 char'
  }

  return errors
}

export class NewTicket extends React.Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderTextField = this.renderTextField.bind(this)
    this.renderTextAreaField = this.renderTextAreaField.bind(this)
  }

  renderTextAreaField(field) {
    var options = {}
    var maxLengthOpt = (field.maxLength ? {maxLength: field.maxLength} : {})
    options = _.merge({}, options, maxLengthOpt)

    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <Field name={field.name} component="textarea" placeholder={field.placeholder} className={`form-control ${field.className}`} rows="4"/>
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  renderTextField(field) {
    var options = {}
    var maxLengthOpt = (field.maxLength ? {maxLength: field.maxLength} : {})
    options = _.merge({}, options, maxLengthOpt)

    return(
      <div className={`form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`}>
        <input {...field.input} type='text' className={`form-control ${field.className ? field.className : ''}`} placeholder={field.placeholder} {...options} />
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  handleSubmit({subject, description}) {
    this.props.ticketActions.createTicket({subject, description})
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;
    return (
      <div className='jumbotron'>
        <center><h3>Support Ticket</h3></center>
        <form onSubmit={handleSubmit(this.handleSubmit)} >
          <div className='col-md-12 margin-top-job'>
            <div className='col-md-12 no-padding'>
              <label> Subject </label>
            </div>

            <div className='col-md-12'>
              <Field name="subject" component={this.renderTextField} maxLength={50} placeholder={'less than 50 char'} />
            </div>
          </div>

          <div className='col-md-12'>
            <div className='col-md-12'>
              <label> Description </label>
            </div>

            <div className='col-md-12'>
              <Field name="description" component={this.renderTextAreaField} maxLength={600} placeholder={'less than 600 char'} />
            </div>
          </div>

          <div className="col-md-12 margin-top-job no-padding">
            <div className="form-group col-md-12">
              <button type="submit" className="btn btn-success btn-block" disabled={isSubmitting}>Submit</button>
            </div>
          </div>

        </form>
        <div className='clearfix'></div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    createTicket: state.getIn(['createTicket']),
    isSubmitting: state.getIn(['createTicket', 'submitting'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketActions: bindActionCreators(TicketActions, dispatch)
  }
}

NewTicket = reduxForm({
  form: 'NewTicketForm',
  asyncValidating: true,
  validate
})(NewTicket);

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket);
