//Customer Ticket component
import React from 'react';

export default class Ticket extends React.Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Last Activity</th>
          </tr>
        </thead>
        <tbody>
          { 
            this.props.tickets.map((ticket, index) => {
              return(
                <tr key={index}>
                  <td>{ticket.get('id')}</td>
                  <td><button className="btn btn-primary" type="button">{ticket.get('status')}</button></td>
                  <td>{ticket.get('subject')}</td>
                  <td>{ticket.get('message')}</td>
                  <td>{(new Date(ticket.get('updated_at'))).toDateString()}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}


  