import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from '../../app/routes';
import configureStore from '../../app/store/configureStore';

const store = configureStore(window.__REDUX_STATE__);
ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.querySelector('.react-container'),
);
