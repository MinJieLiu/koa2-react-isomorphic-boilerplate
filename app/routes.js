import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/App';
import Picture from './components/Picture';
import Counter from './containers/Counter';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="picture" component={Picture} />
      <Route path="counter" component={Counter} />
    </Route>
  </Router>
);
