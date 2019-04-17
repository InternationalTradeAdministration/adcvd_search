import { filter, isEmpty, reduce } from 'lodash';
import React from 'react';
import { PropTypes } from 'prop-types';

import Result from './result';
import NoResult from './no_result';
import Spinner from '../../components/spinner';

function contentType({ results, apis }) {
  if (isEmpty(results) || isEmpty(apis)) return { type: 'blank' };

  if (apis.length === 1 && !results[apis[0].uniqueId]) return { type: 'blank' };

  // wait for all the responses to be returned before showing any result.
  for (const { async, uniqueId } of apis) {
    if (results[uniqueId] && results[uniqueId].isFetching && !async) return { type: 'loading' };
  }

  const matchedAPIs = reduce(apis, (output, selectedAPI) => {
    if (!results[selectedAPI.uniqueId]) return output;
    const matched = !isEmpty(results[selectedAPI.uniqueId].items);
    return matched ? output.concat(selectedAPI) : output;
  }, []);

  if (matchedAPIs.length === 0) return { type: 'noResult' };

  return { type: 'result', matchedAPIs };
}

const Content = ({ findTemplate, onPaging, onSelect, query, results, selectedAPIs, window }) => {
  let content = null;
  const apis = filter(selectedAPIs, api => api.result.enable);
  const { type, matchedAPIs } = contentType({ results, apis });
  switch (type) {
  case 'result':
    content = (
      <Result
        api={ matchedAPIs[0] }
        findTemplate={ findTemplate }
        onPaging={ onPaging }
        query={ query }
        result={ results[matchedAPIs[0].uniqueId] }
        window={ window }
      />
    );
    break;

  case 'loading':
    content = (
      <div className="mi-search__spinner-container">
        <Spinner />
      </div>
    );
    break;

  case 'noResult':
    content = <NoResult />;
    break;

  default:
    content = null;
  }

  return content;
};

Content.propTypes = {
  findTemplate: PropTypes.func.isRequired,
  onPaging: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  selectedAPIs: PropTypes.array.isRequired,
  window: PropTypes.object.isRequired
};

export default Content;
