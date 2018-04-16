import { isEmpty, keys, omitBy, values } from 'lodash';
import { stringify } from 'querystring';
import { push } from 'react-router-redux';

export function updatePath() {
  return (dispatch, getState) => {
    const { query, selectedAPIs } = getState();
    const params = Object.assign({}, query);
    if(params.q)
    	params.q = params.q.replace(/\.{1}/g, '') 

    let apiName = '';
    if (keys(selectedAPIs).length === 1) apiName = values(selectedAPIs)[0].uniqueId;
    window.scrollTo(0, 0);
    return dispatch(push(`/search/${apiName}?${stringify(omitBy(params, isEmpty))}`));
  };
}
