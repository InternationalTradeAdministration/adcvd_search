import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Pagination from 'react-js-pagination';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import ResultsList from './ResultsList';
import FiltersContainer from './FiltersContainer';
import './styles/ResultsContainer.scss';

class ResultsContainer extends Component {

  // getQuery = () => this.props.location.search.substring(1);

  handlePageChange(pageNumber) {
    this.props.fetchNewPage(this.props.resultState.searchQuery, pageNumber)
  };

  render() {
    return (
      <div className="ResultsContainer">

        <FiltersContainer aggregations={this.props.resultState.aggregations}/>

        <ReactPlaceholder 
          type='text' 
          showLoadingAnimation={true} 
          ready={!this.props.resultState.loading} 
          rows={6} style={{ width: 250, margin: '2em 0 0.5em 1em' }} color='#E0E0E0'
        >

          <ResultsList searchQuery={this.props.resultState.searchQuery} total={this.props.resultState.total} results={this.props.resultState.results}/>

        </ReactPlaceholder>

        { (this.props.resultState.total > 0) ? (
          <Pagination 
            activePage={this.props.resultState.activePage}
            totalItemsCount={this.props.resultState.total}
            itemsCountPerPage={10}
            firstPageText="<<"
            prevPageText="<"
            nextPageText=">"
            lastPageText=">>"
            onChange={(pageNumber) => this.handlePageChange(pageNumber)}
          />
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    appliedFilters: state.appliedFilters,
    resultState: state.resultState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewQuery: (searchQuery, activePage) => dispatch(actionCreators.fetchNewQuery(searchQuery, activePage)),
    fetchNewPage: (searchQuery, pageNumber) => dispatch(actionCreators.fetchNewPage(searchQuery, pageNumber))
  }
}

export default ResultsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultsContainer));
