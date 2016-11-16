import * as types from '../constants/types';
import * as routes from '../constants/routes';
import 'whatwg-fetch';
import { push } from 'react-router-redux';
import { setHeaders, getHeaders } from '../utils/customHeader';
import Immutable from 'immutable';

export function createTicket({subject, description}) {
  return function(dispatch){
    dispatch({ type: types.CREATE_CUSTOMER_TICKET })
    const url = API_URL + "/tickets";
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          subject: subject,
          message: description,
        })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result){
          dispatch({
            type: types.CREATE_CUSTOMER_TICKET_SUCCESS,
            data: data
          })
          dispatch(push(routes.TICKETS));
        }else{
          dispatch({
            type: types.CREATE_CUSTOMER_TICKET_ERROR,
            data: data.errors.join(", ")
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create support ticket:: " + error);
      })
  }
}

export function ticketList() {
  return function(dispatch){
    dispatch({ type: types.CUSTOMER_TICKET_LIST })
    const url = API_URL + "/tickets";
    fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: getHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'
        })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result){
          dispatch({
            type: types.CUSTOMER_TICKET_LIST_SUCCESS,
            data: Immutable.fromJS(data.tickets)
          })
        }else{
          dispatch({
            type: types.CUSTOMER_TICKET_LIST_ERROR,
            data: data.errors.join(", ")
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while listing support ticket:: " + error);
      })
  }
}

export function agentTicket() {
  return function(dispatch){
    dispatch({ type: types.AGENT_TICKET_LIST })
    const url = API_URL + "/agent/tickets";
    fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: getHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'
        })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result){
          dispatch({
            type: types.AGENT_TICKET_LIST_SUCCESS,
            data: Immutable.fromJS(data.tickets)
          })
        }else{
          dispatch({
            type: types.AGENT_TICKET_LIST_ERROR,
            data: Immutable.fromJS(data.tickets)
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while listing support ticket:: " + error);
      })
  }
}

export function updateTicket(id, status) {
  return function(dispatch){
    dispatch({ type: types.UPDATE_TICKET_STATUS })
    const url = API_URL + "/agent/tickets/" + id;
    fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: getHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'
        }),
          body: JSON.stringify({
            status: status
          })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result){
          dispatch({
            type: types.UPDATE_TICKET_STATUS_SUCCESS
          })

          dispatch({
            type: types.UPDATE_AGENT_TICKET_LIST,
            id: id,
            status: status
          })

        }else{
          dispatch({
            type: types.UPDATE_TICKET_STATUS_ERROR,
            data: data.errors.join(", ")
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while listing support ticket:: " + error);
      })
  }
}