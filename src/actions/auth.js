import * as types from '../constants/types';
import 'whatwg-fetch';
import {reset} from 'redux-form';

import { push } from 'react-router-redux';

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
        return(response.json());
      })
      .then(function(data){
        if (data.result==0){
          dispatch({
            type: types.LOGIN_SUCCESS_USER,
            data: data
          })
          dispatch(push('/'));
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

export function createUser({email, password, country, firstName, lastName}) {
  return function(dispatch){
    dispatch({ type: types.CREATE_USER })

    const url = API_URL + '/users'
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
          first_name: firstName,
          last_name: lastName,
          country: country
        })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result==0){
          dispatch({
            type: types.LOGIN_SUCCESS_USER,
            data: data
          })
          dispatch(reset('SignUpForm')); 
          dispatch(push('/'));
        }else{
          dispatch({
            type: types.CREATE_ERROR_USER,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create user:: " + error);
      })
  }
}

export function changePassword({password, passwordConfirmation}, token) {
  return function(dispatch){
    dispatch({ type: types.CHANGE_PASSWORD })

    const url = API_URL + "/users/change_password";
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          password_confirmation: passwordConfirmation,
          token: token
        })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        console.log("===================data forgotPassword==========", data)
        if (data.result==0){
          dispatch({
            type: types.CHANGE_PASSWORD_SUCCESS
          })
          dispatch(push('/search-job'));
        }else{
          dispatch({
            type: types.CHANGE_PASSWORD_ERROR,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create changePassword:: " + error);
      })
  }
}
