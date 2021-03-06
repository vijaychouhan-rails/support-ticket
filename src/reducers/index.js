import { combineReducers } from 'redux-immutable';
import auth from './auth';
import createTicket from './createTicket';
import ticketList from './ticketList';
import agentTicket from './agentTicket';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import customRehydrate from './customRehydrate';


const rootReducer = combineReducers({
  routing: routerReducer,
  auth: auth,
  agentTicket: agentTicket,
  ticketList: ticketList,
  createTicket: createTicket,
  form: formReducer,
  customRehydrate: customRehydrate
});

export default rootReducer;
