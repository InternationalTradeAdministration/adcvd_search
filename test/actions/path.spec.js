import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as actions from '../../src/js/actions';

const mockStore = configureMockStore([thunk]);

describe('actions/path', () => {
  it('should create an action to update path', () => {
    const store = mockStore({
      query: { q: 'test', countries: 'example' },
      selectedAPIs: [{ uniqueId: 'example' }]
    });
    const expectedActions = [
      { 
        payload: {
          args: [
            '/search/example?q=test&countries=example'
          ],
          method: 'push'
        },
        type: '@@router/CALL_HISTORY_METHOD',
       }
    ];
    store.dispatch(actions.updatePath());
    expect(store.getActions()).to.eql(expectedActions);
  });
});
