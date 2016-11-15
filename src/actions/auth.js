import * as types from '../constants/types';
import * as routes from '../constants/routes';
import 'whatwg-fetch';
import {reset} from 'redux-form';
import { push } from 'react-router-redux';
import { setHeaders, getHeaders } from '../utils/customHeader';

export function createSession({email, password}) {
  return function(dispatch){
    dispatch({ type: types.LOGIN_USER })
    const url = API_URL + "/session/create";
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
      .then(function(response){
        if(response.status==200){
          setHeaders(response.headers)
        }
        return(response.json());
      })
      .then(function(data){
        if (data.result==0){
          dispatch({
            type: types.LOGIN_SUCCESS_USER,
            data: data
          })
          dispatch(push(routes.CUSTOMER_DASHBOARD));
        }else{
          dispatch({
            type: types.LOGIN_ERROR_USER,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create createSession:: " + error);
      })
  }
}

export function destroySession() {
  return function(dispatch){
    dispatch({ type: types.LOGOUT_USER })
    dispatch({ type: types.LOGOUT_SUCCESS_USER })
    dispatch(push('/'));
  }
}

export function createUser({email, password, name}) {
  return function(dispatch){
    dispatch({ type: types.CREATE_USER })

    const url = API_URL + '/auth'
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: email,
          password: password,
          name: name
        })
      })
      .then(function(response){
        if(response.ok){
          setHeaders(response.headers)
        }
        return(response.json());
      })
      .then(function(data){
        if (data.status==='success'){
          dispatch({
            type: types.CREATE_SUCCESS_USER,
            data: data
          })
          dispatch(reset('SignUpForm')); 
          dispatch(push('/'));
        }else{
          dispatch({
            type: types.CREATE_ERROR_USER,
            errors: data.errors.full_messages.join(", ")
          })
        }
      })
      .catch(function(error){
        dispatch({
          type: types.CREATE_ERROR_USER,
          errors: ''
        })
        console.log("Opps...", "Error while create user:: " + error);
      })
  }
}
