import React, { Component } from 'react';
import { DataSearch } from '@appbaseio/reactivesearch';
import ItemResults from './ItemResults';
import { Redirect } from 'react-router-dom';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTopics: this.currentTopics
    };
    this.changeQuery = this.changeQuery.bind(this);
  }


  changeQuery(value) {
    this.setState({
      currentTopics: ['None']
    });
    this.setState({ redirect: true });
    this.setState({ queryparam: value });
  }

  render() {
    if(this.state.redirect) {
      return <Redirect push to={`/search/?newrepo="${this.state.queryparam}"`} />;
    }
    return (
      <div className="results-container">
        <DataSearch
          componentId="repos"
          onValueSelected={this.changeQuery}
          defaultSelected={this.props.match.params.id}
          filterLabel="Search"
          dataField={['upc', 'mini_name']}
          placeholder="Search Items"
          iconPosition="left"
          queryFormat="or"
          autosuggest={true}
          className="data-search-container results-container"
          innerClass={{
            input: 'search-input'
          }}
        />
        <ItemResults  />
      </div>
    );
  }
}

export default Item;
