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
            <th>#Actions</th>
          </tr>
        </thead>
        <tbody>
          { 
            this.props.tickets.map((ticket, index) => {
              return(
                <tr key={index}>
                  <td>{ticket.get('id')}</td>
                  <td><button className="btn btn-info btn-sm " type="button">{ticket.get('status')}</button></td>
                  <td>{ticket.get('subject')}</td>
                  <td>{ticket.get('message')}</td>
                  <td>{(new Date(ticket.get('updated_at'))).toDateString()}</td>
                  <td><button className='btn btn-success btn-sm' onClick={() => this.props.handleChangeStatus(ticket.get('id'), 'work_in_progress')}> Work in Progress</button>
                    <button className='btn btn-danger btn-sm margin-sm-left' onClick={() => this.props.handleChangeStatus(ticket.get('id'), 'close')}> Close </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}


  