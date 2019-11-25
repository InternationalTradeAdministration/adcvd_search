export function paramGenerator(getState) {
  let params = '';
  if (getState().appliedFilters) {
    Object.entries(getState().appliedFilters).forEach(
      ([key, value]) => {
        if (getState().appliedFilters[key].length > 0) {
          if (key === 'products') {
            /* replace commas within the item with spaces, then add it to the list separated by commas */
            params += `&sanitized_products=${getState().appliedFilters[key].map(item => item.replace(commaRegex, '%20'))}`
          }
          if (key !== 'products') {
            /* just add it to the list as-is */
            params += `&${key}=${getState().appliedFilters[key].map(item => item)}`
          }
        }
      }
    )
  }
  return params;
}

const commaRegex = /,/g;
