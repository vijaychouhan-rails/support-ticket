import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  {signedIn: false, userId: null, errors: null, submitting: false, userType: null}
);

export default function auth(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.LOGIN_USER:
      return state.merge({signedIn: false, errors: null, submitting: true })
    case types.LOGIN_SUCCESS_USER:
      return state.merge({signedIn: true, userId: data.user_id, errors: null, submitting: false })
    case types.LOGIN_ERROR_USER:
      return state.merge({errors: data.message, submitting: false })

    case types.CREATE_USER:
      return state.merge({errors: null, submitting: true })
    case types.CREATE_SUCCESS_USER:
      return state.merge({signedIn: true, userId: data.user_id, errors: null, submitting: false })
    case types.CREATE_ERROR_USER:
      return state.merge({errors: action.errors, submitting: false })

    case types.LOGOUT_USER:
      return state.merge({ submitting: true })
    case types.LOGOUT_SUCCESS_USER:
      return initialState
    case types.LOGOUT_ERROR_USER:
      return state.merge({errors: "Error, please try again", submitting: false })
    default:
      return state;
  }
}
