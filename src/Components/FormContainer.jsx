import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import ResultsContainer from './ResultsContainer';

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      submitted: false,
    }
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    // this.props.history.push({ search: `${this.state.searchQuery}`});
    this.props.fetchNewQuery(this.state.searchQuery);
  }

  render() {
    return (
      <div>
        { !this.state.submitted ? (
          <p>Through the enforcement of U.S. Antidumping Duty (AD) and Countervailing Duty (CVD) trade laws, the International Trade Administration is able to safeguard and enhance the competitive strength of U.S. industries against unfair trade and ensure compliance with trade agreements negotiated on behalf of the U.S. This site serves as a public notice of active case proceedings, including such information as upcoming announcement dates, harmonized tariff schedule numbers, and scope of the order.</p>
        ) : null }
        <p>Search Instructions: To get started, enter in either a country, product, Case Number, HTS Number, or Commodity.</p>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type="text" 
            name="searchQuery"
            aria-label="Enter search query"
            placeholder="Enter search query"
            value={this.state.searchQuery}
            onChange={(event) => this.handleChangeInput(event)}
          />
          <button type="submit" aria-label="submit">Search</button>
        </form>
        { this.state.submitted ? (
          <ResultsContainer searchQuery={this.state.searchQuery}/>
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    resultState: state.resultState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewQuery: (searchQuery) => dispatch(actionCreators.fetchNewQuery(searchQuery)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormContainer));