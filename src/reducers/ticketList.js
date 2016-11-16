import * as types from '../constants/types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS(
  {ticket: [], submitting: false, errors: null}
);

export default function ticketList(state = initialState, action) {
  let data = action.data
  switch(action.type) {
    case types.CUSTOMER_TICKET_LIST:
      return state.merge({submitting: true})
    case types.CUSTOMER_TICKET_LIST_SUCCESS:
      const newState = initialState.set('ticket', initialState.get('ticket').push(...data));
      return newState.merge({ submitting: false })
    case types.CUSTOMER_TICKET_LIST_ERROR:
      return state.merge({errors: data.errors, submitting: false})
    default:
      return state;
  }
}
