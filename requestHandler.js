//Server configuration
//Importing require components
import React from 'react'

// Redux is a predictable state container for JavaScript apps.
import { createStore, applyMiddleware } from 'redux';

//React bindings for Redux
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

//Roor reducers, rootReducer is contain combined reducers 
import rootReducer from './src/reducers/index';

import { match, RouterContext } from 'react-router'
import routes from './src/routes'

//Redux Thunk middleware allows us to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters
import thunkMiddleware from 'redux-thunk' 

import { browserHistory } from 'react-router';

function handleRender(req,res) {
  const routesMap = {
    routes,
    location: '/'
  }

  //mapping with routes
  match(routesMap, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send("Could not fulfill this request. Please try again later.")
    } else if (redirectLocation) {
      console.log("=============redirectLocation==========================")
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      //Creating store for server side rendering
      const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
      const body = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      //Getting Initial state
      const initialState = store.getState();

      //Rendring the page from server side
      res.status(200).send(renderFullPage(body, initialState))
    } else {
      res.status(404).send('Not found')
    }

  })
}

function renderFullPage(component, initialState){
  return `<!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <title>Support System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      </head>
    <body>
      <div id="app">${component}</div>
      <script>
       window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>`
}

module.exports = handleRender
