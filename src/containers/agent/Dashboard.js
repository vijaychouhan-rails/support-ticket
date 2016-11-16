import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as TicketActions from '../../actions/ticket';
import TicketList from '../../components/agent/Ticket'
import _ from 'lodash';

export class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.loadTickets = this.loadTickets.bind(this)
    // this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  componentWillMount(){
    this.props.ticketActions.agentTicket()
  }

  loadTickets(){
    return(
      <div>
        <div className="jumbotron">
          <div className="container">
            <h3> Tickets </h3>
            <TicketList tickets={this.props.tickets} handleChangeStatus={(id, status) => this.handleChangeStatus(id, status)}/>
          </div>
        </div>
      </div>
    )
  }

  handleChangeStatus(id, status){
    this.props.ticketActions.updateTicket(id, status)
  }

  render() {
    const { isSubmitting } = this.props;
    return (
      <div>
        <center><h3> Ticket Listing </h3></center>
        {isSubmitting ? 'loading...' : this.loadTickets() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.getIn(['agentTicket', 'tickets']),
    isSubmitting: state.getIn(['agentTicket', 'submitting'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketActions: bindActionCreators(TicketActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

