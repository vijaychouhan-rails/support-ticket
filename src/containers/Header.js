import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import Immutable from 'immutable';

import { bindActionCreators } from 'redux';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(event){
    // this.props.authActions.destroySession();
    console.log("===========handleClick==========")
    event.preventDefault()
  }

  renderLinks() {
    if (this.props.auth.getIn(['signedIn'])) {
      return (
        <Nav>
          <LinkContainer to={{ pathname: '/support' }} className="nav-link">
            <NavItem>Support</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: '/test' }} className="nav-link">
            <NavItem>Test</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: '#' }} className="nav-link" onClick={(e)=> this.handleClick(e)}>
            <NavItem>Logout</NavItem>
          </LinkContainer>
        </Nav>
      )
    }
    else{
      return(
        <Nav>
          <LinkContainer to={{ pathname: '/login' }} className="nav-link">
            <NavItem>Login</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: '/signup' }} className="nav-link">
            <NavItem>SignUp</NavItem>
          </LinkContainer>

        </Nav>
      )
    }
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">Support Ticket</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.getIn(['auth'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // authActions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);