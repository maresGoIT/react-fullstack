---
title: Protected Route Example
description: an example for a protected route in react-router
tags:
  - redux
  - react-router
---
# Protected Route & Persistance

## Protected Route
An protected route component, ProtectedRoute.tsx:
~~~javascript
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ path, exact, children }) => {
  const auth = useSelector((store) => store.authenticated);

  return auth ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
~~~

## Persistance

Install **redux-persist** library.
~~~
npm install redux-persist
~~~


Make updates to the redux store config file.
~~~ javascript
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import counterReducer from '../features/counter/counterSlice';

const reducers = combineReducers({
  counter: counterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
~~~


Add PersistGate wrapper for the store provider (index.js):
~~~javascript
// ...

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// ...
~~~