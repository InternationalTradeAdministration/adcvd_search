import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import resultReducer from './resultReducer';

const rootReducer = combineReducers({
  appliedFilters: filterReducer,
  resultState: resultReducer,
})

export default rootReducer;