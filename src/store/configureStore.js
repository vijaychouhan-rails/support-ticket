import rootReducer from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';

//Thunk middleware for Redux
import reduxThunk from 'redux-thunk';

import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import Immutable from 'immutable';
import createLogger from 'redux-logger';

// Auto load redux store
import { persistStore, autoRehydrate } from 'redux-persist-immutable'

// import localForage from 'localForage'
import localForage from "localforage";

//We are using REHYDRATE to persis redux-store when refresh browser.
import createExpirationTransform from 'redux-persist-transform-expire';
import createCompressor from 'redux-persist-transform-compress'
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'

import { REHYDRATED_DONE } from '../constants/types';

export default function configureStore(i_state={}) {
  const middleware = routerMiddleware(browserHistory)
  const initialState = Immutable.fromJS(i_state)
  const logger = createLogger();
  const compressor = createCompressor()

  const expireTransform = createExpirationTransform({
    expireKey: new Date(new Date().getTime() + 1*60000)
  });


  const store = compose(
                applyMiddleware(reduxThunk, middleware, createActionBuffer(REHYDRATE)),
                autoRehydrate(), window.devToolsExtension ? window.devToolsExtension() : f => f
              )(createStore)(rootReducer, initialState)

  persistStore(store, {transforms: [expireTransform, compressor], whitelist: ['auth'], storage: localForage, keyPrefix: 'supportSystem' }, () => {
      store.dispatch({
        type: REHYDRATED_DONE
      })
      console.log('=======================store rehydration complete========================')
  })

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
