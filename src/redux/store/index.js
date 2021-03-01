// import {createStore, applyMiddleware} from 'redux';
import React from 'react';
import {createStore} from 'redux';

// import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';
import {Provider} from 'react-redux';
// import rootSaga from '../sagas';
// const sagaMiddleware = createSagaMiddleware();

const storeApp = createStore(
  rootReducer,
  // , applyMiddleware(sagaMiddleware)
);

const store = (props) => {
  return <Provider store={storeApp}>{props.children}</Provider>;
};
// sagaMiddleware.run(rootSaga);

export default store;
