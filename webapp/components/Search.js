import React, { Component } from 'react';
import { ReactiveBase, DataSearch, CategorySearch } from '@appbaseio/reactivesearch';
import Results from './Results';

class Search extends Component {
  render() {
    return (
      <div className="results-container">
        <CategorySearch
          componentId="repoer"
          filterLabel="Search"
          dataField="mini_name"
          defaultSelected={this.props.match.params.id}
          categoryField="categories.lvl1"
          placeholder="Search Items"
          iconPosition="left"
          queryFormat="and"
          autosuggest={true}
          className="data-search-container results-container"
          innerClass={{
            input: 'search-input'
          }}
        />
        <Results currentTopics={this.currentTopics} toggleTopic={this.toggleTopic} smallHeader={true} />
      </div>
    );
  }
}

export default Search;
