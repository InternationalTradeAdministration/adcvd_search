import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import * as actions from '../../src/js/actions';
import { allAPIs as apis } from '../../src/js/apis';
import * as config from '../../src/js/apis/config'

const uniqueId = apis.adcvd_orders.uniqueId;

const payload = {
  aggregations: {},
};

describe('actions/result', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action to request results', () => {
    const expectedAction = {
      type: actions.REQUEST_RESULTS,
      meta: uniqueId
    };
    expect(actions.requestResults(uniqueId)).to.eql(expectedAction);
  });


  it('should create an action to receive results', () => {
    const expectedAction = {
      type: actions.RECEIVE_RESULTS,
      meta: uniqueId,
      payload
    };
    expect(actions.receiveResults(uniqueId, payload)).to.eql(expectedAction);
  });

  it('should create an action to indicate failure when requesting results', () => {
    const expectedAction = {
      type: actions.FAILURE_RESULTS,
      error: true,
      meta: uniqueId,
      payload
    };
    expect(actions.failureResults(uniqueId, payload)).to.eql(expectedAction);
  });

  it('create RECEIVE_RESULTS when results have been received', (done) => {
    const mockStore = configureMockStore([thunk]);
    const state = {
      filtersByAggregation: {},
      query: { q: 1 },
      resultsByAPI: {},
      selectedAPIs: [apis.adcvd_orders],
      notifications: ['cool']
    };

    nock(config.trade.host)
      .get('/v1/adcvd_orders/search?api_key='+config.trade.key)
      .reply(200, apis);

    const store = mockStore(state);

    store.dispatch(actions.fetchResultsByAPI())
      .then(() => {
        expect(store.getActions().length).to.eql(2);

        expect(store.getActions()[0].type).to.eql(actions.REQUEST_RESULTS);
        expect(store.getActions()[0].meta).to.eql(uniqueId);
        expect(store.getActions()[0].payload).to.not.exist;

        expect(store.getActions()[1].type).to.eql(actions.RECEIVE_RESULTS);
        expect(store.getActions()[1].meta).to.eql(uniqueId);
        expect(store.getActions()[1].payload).to.exist;
      })
      .then(done)
      .catch(done);
  });
});
