import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import rootReducer from './reducers';
import NoMatch from './containers/no-match';
import App from './containers/app';

const store = createStore(rootReducer, applyMiddleware(thunk));

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:type)" component={App}/>
      <Route path="*" component={NoMatch}/>
    </Router>
  </Provider>
), document.getElementById('root'));
