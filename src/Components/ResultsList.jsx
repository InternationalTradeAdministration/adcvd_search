import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles/ResultsList.scss';

const ResultsList = (props) => {

  // const spaceRegex = /(%20)+/g;
  // const formattedQuery = props.location.search.replace(spaceRegex, ' ').substring(1);

  return(
    <div className="ResultsList">
      <p className="searchMessage"><strong className="searchMessageKeyword">{props.total}</strong> results from the ADCVD Cases were found for <strong className="searchMessageKeyword">{props.searchQuery}.</strong></p>

      { props.results.map(item => {
        return (
          <div className="anItem" key={item.id}>
            <a href={item.url}>{item.country}, {item.product}</a>
            <p>{item.product}</p>
            <p>{item.case_number}</p>
          </div>
        )
      }) }
    </div>
  )
}

export default withRouter(ResultsList);