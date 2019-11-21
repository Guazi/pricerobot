import React, { Component } from 'react';
import { CategorySearch } from '@appbaseio/reactivesearch';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'antd';


class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentTopics: this.currentTopics
      };
    this.changeQuery = this.changeQuery.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  changeQuery(value) {
    this.setState({
      currentTopics: ['None']
    });
    this.setState({ redirect: true });
    this.setState({ queryparam: value });
  }
  
  changeValue(value) {
    console.log(value);
  }

  render() {
    if(this.state.redirect) {
        return <Redirect push to={`/search/?newrepo="${this.state.queryparam}"`} />;
      }
    return (
      <div className="mid-container">
          <Row type="flex" align="top">
<Col xs={24} md={12}>
  <h4>What are you looking to buy?</h4>
</Col>
</Row>
        <CategorySearch
                componentId="newrepo"
                filterLabel="Search"
                dataField="mini_name"
                categoryField="categories.lvl1"
                placeholder="Enter an item here (ex. iPhone case)"
                iconPosition="left"
                queryFormat="and"
                autosuggest={true}
                innerClass={{
                  input: 'search-input'
                }}
                onValueSelected={this.changeQuery}
              />
      </div>
    );
  }
}

export default Middle;
