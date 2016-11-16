import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as TicketActions from '../../actions/ticket';
import { bindActionCreators } from 'redux';
import TicketList from '../../components/customer/Ticket'
// import _ from 'lodash';

export class Ticket extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
    this.props.ticketActions.ticketList()
  }
  
  render() {
    const { isSubmitting } = this.props;
    return (
      <div>
        <center><h3> Track Ticket Status </h3></center>
        {isSubmitting ? 'loading ticket' : <TicketList tickets={this.props.ticketList}/>}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    ticketList: state.getIn(['ticketList', 'ticket']),
    isSubmitting: state.getIn(['ticketList', 'submitting'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketActions: bindActionCreators(TicketActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
