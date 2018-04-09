import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

import App from './app';
import Search from './search';

const Root = ({ history, store }) => {
  return(
    <Provider store={ store }>
      <Router history={ history }>
        <Route component={ App }>
          <Route path="/" component={ Search } />
          <Route path="search(/:api)" component={ Search } />
        </Route>
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
