import { combineReducers } from 'redux-immutable';
import auth from './auth';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import customRehydrate from './customRehydrate';


const rootReducer = combineReducers({
  routing: routerReducer,
  auth: auth,
  form: formReducer,
  customRehydrate: customRehydrate
});

export default rootReducer;
