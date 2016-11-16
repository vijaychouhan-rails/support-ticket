import * as types from '../constants/types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS(
  {tickets: [], submitting: false, errors: null }
);

export default function agentTicket(state = initialState, action) {
  const data = action.data
  switch(action.type) {
    case types.AGENT_TICKET_LIST:
      return state.merge({submitting: true})
    case types.AGENT_TICKET_LIST_SUCCESS:
      const newState = initialState.set('tickets', initialState.get('tickets').push(...data))
      return newState.merge({ submitting: false })
    case types.AGENT_TICKET_LIST_ERROR:
      return state.merge({errors: data.errors, submitting: false})
    case types.UPDATE_AGENT_TICKET_LIST:
      const index = state.get('tickets').findIndex(ticket => ticket.get('id') === action.id)
      if(index===-1){
        return state
      }else{
        return state.setIn(['tickets', index, 'status'], action.status)
      }
    default:
      return state;
  }
}
