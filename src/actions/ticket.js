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
        //Need to update according to api end point
        if (true){
          dispatch({
            type: types.CREATE_CUSTOMER_TICKET_SUCCESS,
            data: data
          })
          dispatch(push(routes.CUSTOMER_DASHBOARD));
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
        //Need to update according to api end point
        if (true){
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
