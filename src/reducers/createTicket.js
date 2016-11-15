import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  {errors: null, submitting: false}
);

export default function createTicket(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.CREATE_CUSTOMER_TICKET:
      return state.merge({errors: null, submitting: true})
    case types.CREATE_CUSTOMER_TICKET_SUCCESS:
      return state.merge({submitting: false})
    case types.CREATE_CUSTOMER_TICKET_ERROR:
      return state.merge({errors: data.message, submitting: false})
    default:
      return state;
  }
}
