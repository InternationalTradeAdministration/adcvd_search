import 'react-app-polyfill/ie11'; // this polyfill needs to be first for IE11 support
import 'react-app-polyfill/stable';
import 'core-js/stable'; // necessary for IE11 support for Router
import 'regenerator-runtime/runtime'; // necessary for IE11 support for Router
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './Components/App';
import rootReducer from './store/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk))
);

function renderAdcvdSearch(divID) {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter hashType="noslash">
        <App />
      </HashRouter>
    </Provider>,
    document.getElementById(divID)
  );
}

export default renderAdcvdSearch;
window.Explorer = {
  renderAdcvdSearch: renderAdcvdSearch,
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
