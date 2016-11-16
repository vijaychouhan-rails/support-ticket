import * as types from '../constants/types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS(
  {submitting: false, errors: null}
);

export default function updateTicket(state = initialState, action) {
  let data = action.data
  switch(action.type) {
    case types.UPDATE_TICKET_STATUS:
      return state.merge({submitting: true})
    case types.UPDATE_TICKET_STATUS_SUCCESS:
      return state.merge({ submitting: false })
    case types.UPDATE_TICKET_STATUS_ERROR:
      return state.merge({errors: data.errors, submitting: false})
    default:
      return state;
  }
}
