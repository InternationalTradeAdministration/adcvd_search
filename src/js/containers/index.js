
import React from 'react';

class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      suggestions: [],
      typeaheads: [],
      form_label: "" 
    }
  }

  componentDidUpdate(){
    if(!isEmpty(this.props.selectedAPIs)){
      const apis = filter(this.props.selectedAPIs, api => api.result.enable);
      const api = apis[0];
      const typeaheads = this.props.typeaheads[api.pathname].typeaheads;

      if (isEmpty(this.state.typeaheads) && !isEmpty(typeaheads))
        this.setState({ typeaheads: typeaheads });
      if (this.state.form_label === "")
        this.setState({ form_label: api.formLabel });
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const return_array = inputLength < 2 ? [] : this.state.typeaheads.filter(val => {
        let new_val = val.trim().toLowerCase()
        return new_val.includes(inputValue);
      }
    );
    return return_array;
  };

    // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.fields.q.onChange(suggestion);
  }

  render(){
    const { fields, focused, handleSubmit } = this.props;
    const inputProps = {
      className: "mi-form__field",
      autoFocus: focused,
      type: "text",
      placeholder: "Keyword",
      'aria-label': "Enter keyword",
      ...fields.q
    };
    return(
      <form className="mi-form" onSubmit={ handleSubmit }>
        <label className="mi-form__search-label" htmlFor="q">{this.state.form_label}</label>
        <div className="mi-form__search-row">
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestionsContainer={renderSuggestionsContainer}
        />

        <span className="mi-form__submit">
          <button className="uk-button mi-form__submit__button" onClick={ handleSubmit } title="Search">
            <i className="mi-icon mi-icon-search" aria-label="Search" />
          </button>
        </span>
        </div>
      </form>
    );
  }
}

export default Index;