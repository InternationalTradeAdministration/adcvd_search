import * as actionTypes from '../actions/actionTypes';

const initialState = {
  case_numbers: [],
  commodities: [],
  countries: [],
  hts_numbers: [],
  products: [],    
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.TOGGLE_FILTER:
      if (state[action.name].includes(action.value)) {
        return {
          ...state,
          [action.name]: state[action.name].filter(el => el !== action.value)
        }
      } else {
        return {
          ...state,
          [action.name]: [...state[action.name], action.value],
        }
      }

    case actionTypes.CLEAR_FILTERS:
      return {
        ...initialState
      }
      
    default:
      return state;    
  }
};

export default filterReducer;