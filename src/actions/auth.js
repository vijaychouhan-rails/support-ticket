//Action
//We are using it to call API end points
//We have used redux-thunk
import * as types from '../constants/types';
import * as routes from '../constants/routes';
import 'whatwg-fetch';

//Used to reset redux-form data
import {reset} from 'redux-form';
import { push } from 'react-router-redux';

//This is function that we are using to set and get headers 
import { setHeaders, getHeaders, removeHeaders } from '../utils/customHeader';

//Create user session
//If it will be success then user will be login on their role based bashboard
//like agent will be see agent dashboard
//and customer will see customer dashboard
export function createSession({email, password}) {
  return function(dispatch){
    dispatch({ type: types.LOGIN_USER })
    //'/auth/sign_in' is api end points
    const url = API_URL + "/auth/sign_in";
    //calling API with POST request
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
          //set the headers in cookies
          setHeaders(response.headers)
        }
        return(response.json());
      })
      .then(function(data){
        if (!data.errors){
          dispatch({
            type: types.LOGIN_SUCCESS_USER,
            data: data.data
          })
          //Redirect user on dashboard 
          if(data.data.user_type==='agent'){
            dispatch(push(routes.AGENT_DASHBOARD));
          }else{
            dispatch(push(routes.CUSTOMER_DASHBOARD));  
          }
        }else{
          dispatch({
            type: types.LOGIN_ERROR_USER,
            errors: data.errors.join(", ")
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create createSession:: " + error);
      })
  }
}

//Destroy user session
//Removed the cookies
//Update the state
export function destroySession() {
  return function(dispatch){
    dispatch({ type: types.LOGOUT_USER })
    dispatch({ type: types.LOGOUT_SUCCESS_USER })
    removeHeaders()
    dispatch(push('/'));
  }
}

//Creating Customer user
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
            data: data.data
          })
          dispatch(reset('SignUpForm')); 
          if(data.data.user_type==='agent'){
            dispatch(push(routes.AGENT_DASHBOARD));
          }else{
            dispatch(push(routes.CUSTOMER_DASHBOARD));  
          }
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
