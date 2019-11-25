import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import FormContainer from './FormContainer';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <Route path={`/`} render={(props) => 
        <FormContainer {...props} />} />
      <Route path={`/?:query`} render={(props) =>
        <FormContainer {...props} location={props.location} />} />
    </div>
  );
}

export default withRouter(App);
