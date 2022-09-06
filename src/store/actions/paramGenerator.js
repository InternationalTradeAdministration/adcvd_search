export function paramGenerator(getState) {
  let params = '';
  if (getState().appliedFilters) {
    Object.entries(getState().appliedFilters).forEach(
      ([key, value]) => {
        if (getState().appliedFilters[key].length > 0) {
          const parameterDelimiter  = PIPE_DELIMITED_FILTERS.includes(key) ? '|' : ','
          let parameterValue = getState().appliedFilters[key].join(parameterDelimiter)
          params += `&${key}=${encodeURIComponent(parameterValue)}`
        }
      }
    )
  }
  return params;
}

const PIPE_DELIMITED_FILTERS = [
    'commodities',
    'countries',
    'products'
]