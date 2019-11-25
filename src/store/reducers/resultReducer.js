import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchQuery: '',
  total: 0,
  offset: 0,
  activePage: 1,
  results: [],
  aggregations: {},
  loading: false,
}

const resultReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.LOADING_RESULTS:
      return { 
        ...state, 
        loading: true, 
      }
    case actionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
      }
    case actionTypes.FETCH_NEW_QUERY:
      return {
        ...state,
        loading: false,
        total: action.response.total,
        offset: action.response.offset,
        results: action.response.results,
        aggregations: action.response.aggregations
      }
    case actionTypes.FETCH_WITH_FILTERS:
      return {
        ...state,
        loading: false,
        total: action.response.total,
        offset: action.response.offset,
        results: action.response.results,
      }
    case actionTypes.UPDATE_SOME_AGGREGATIONS:
      return {
        ...state,
        aggregations: {
          ...state.aggregations,
          [action.aggregation]: action.aggregations[action.aggregation]
        }
      }
    case actionTypes.UPDATE_ALL_AGGREGATIONS:
      return {
        ...state,
        aggregations: action.aggregations,
      }
    case actionTypes.UPDATE_PAGE_NUMBER:
      return {
        ...state,
        loading: true,
        activePage: action.pageNumber,
      }
    case actionTypes.FETCH_NEW_PAGE:
      return {
        ...state,
        loading: false,
        offset: action.response.offset,
        results: action.response.results,
      }
    default:
      return state;
  }
};

export default resultReducer;