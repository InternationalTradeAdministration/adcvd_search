import * as actionTypes from './actionTypes'
import config from '../../API/config.js'
import { paramGenerator } from './paramGenerator';

export const clearFilters = (searchQuery) => {
  document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_FILTERS });
    return fetch(`${config.url}?q=${searchQuery}&size=10&offset=0`, {
      headers: { 'Authorization': 'Bearer ' + config.accessToken }
    })
    .then(response => response.json())
    .then(response => dispatch({ 
      type: actionTypes.FETCH_NEW_QUERY, 
      response: response,
    }));
  }
}

export const toggleFilter = (event, searchQuery) => {
  const { name, value } = event.target;
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.TOGGLE_FILTER,
      name: event.target.name, 
      value: event.target.value  
    });
    dispatch({ type: actionTypes.LOADING_RESULTS })

    let params = paramGenerator(getState);

    return fetch(`${config.url}?q=${searchQuery}${params}&size=10&offset=0`, {
      headers: { 'Authorization': 'Bearer ' + config.accessToken }
    })
      .then(response => response.json())
      .then(response => dispatch(updateAggregations(response, name, value)));  
  }
}

export const updateAggregations = (response, category, value) => {
  return (dispatch, getState) => {
    let aggsToUpdate = [];
    Object.entries(getState().appliedFilters).forEach(
      ([key, value]) => {
        /* add categories to the list if they were not the subject of the toggle, or if the category is/becomes empty */
        if (( key !== category ) || ( Object.entries(getState().appliedFilters[key]).toString() === '' )) {
          aggsToUpdate.push(key)
        }
      }
    )
    dispatch({ type: actionTypes.FETCH_WITH_FILTERS, response: response });
    
    aggsToUpdate.forEach(agg => {
      dispatch({ type: actionTypes.UPDATE_SOME_AGGREGATIONS, aggregations: response.aggregations, aggregation: agg });
    })
  }
}

export const fetchNewQuery = (searchQuery, activePage=1) => {
  document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
  
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_SEARCH_QUERY, searchQuery: searchQuery })
    dispatch({ type: actionTypes.LOADING_RESULTS });
    dispatch({ type: actionTypes.CLEAR_FILTERS });
    return fetch(`${config.url}?q=${searchQuery}&size=10&offset=${(activePage-1)*10}`, {
      headers: { 'Authorization': 'Bearer ' + config.accessToken }
    })
      .then(response => response.json())
      .then(response => dispatch({ 
        type: actionTypes.FETCH_NEW_QUERY, 
        response: response,
      }));
  }
}

export const fetchNewPage = (searchQuery, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.UPDATE_PAGE_NUMBER, pageNumber: pageNumber });

    let params = paramGenerator(getState);
    
    return fetch(`${config.url}?q=${searchQuery}${params}&size=10&offset=${(pageNumber-1)*10}`, {
      headers: { 'Authorization': 'Bearer ' + config.accessToken }
    })
      .then(response => response.json())
      .then(response => dispatch({ 
        type: actionTypes.FETCH_NEW_PAGE, 
        response: response,
      }));
  }
}
