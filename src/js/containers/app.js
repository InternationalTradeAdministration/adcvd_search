import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { dismissNotification } from '../actions/notification';
import { fetchResultsByAPI, invalidateAllResults } from '../actions/result';
import { replaceQuery } from '../actions/query';
import { updatePath } from '../actions/path';
import { updateWindow } from '../actions/window';
import { invalidateAllFilters } from '../actions/filter';
import { getEnabledAPIs } from '../selectors';
import Notification from '../components/notification';

class App extends React.Component {
  componentWillMount() {
    this.props.onResize({ currentTarget: window });
  }
  componentDidMount() {
    const { onResize } = this.props;
    window.addEventListener('resize', onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.props.onResize);
  }
  render() {
    const {
      children, enabledAPIs, notifications, onDismissNotification, onSubmit
    } = this.props;

    return (
      <div>
        <Notification notifications={ notifications } onDismiss={ onDismissNotification } />
        { React.cloneElement(children, { enabledAPIs, onSubmit }) }
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired,
  enabledAPIs: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  notifications: PropTypes.array,
  onDismissNotification: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { notifications, query } = state;
  const enabledAPIs = getEnabledAPIs(state);
  return {
    enabledAPIs,
    notifications,
    query,
    selectedAPIs: enabledAPIs,
    window: {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDismissNotification: (e) => {
      e.preventDefault();
      dispatch(dismissNotification(e.target.dataset.id));
    },
    onResize: (e) => {
      const { innerWidth, innerHeight } = e.currentTarget;
      dispatch(updateWindow({ innerWidth, innerHeight }));
    },
    onSubmit: (query) => {
      dispatch(replaceQuery(query));
      dispatch(invalidateAllResults());
      dispatch(invalidateAllFilters());
      dispatch(fetchResultsByAPI());
      dispatch(updatePath());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
