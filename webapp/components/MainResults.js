import React, { Component } from 'react';
import Results from './Results';
import { ReactiveBase, DataSearch, CategorySearch } from '@appbaseio/reactivesearch';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class MainResults extends Component {
 
  render() {
  

    return (
     <div className="results-container">
        {/* <CategorySearch
          componentId="repo"
          filterLabel="Search"
          dataField="mini_name"
          categoryField="categories.lvl1"
          placeholder="Search Items"
          iconPosition="left"
          queryFormat="and"
          autosuggest={true}
          URLParams
          className="data-search-container results-container"
          innerClass={{
            input: 'search-input'
          }}
        /> */}
        <Results currentTopics={this.currentTopics} toggleTopic={this.toggleTopic} />
      </div>
    );
  }
}

export default MainResults;
