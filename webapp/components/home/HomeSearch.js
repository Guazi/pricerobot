import React, { Component } from 'react';
import { ReactiveBase, CategorySearch, ReactiveList } from '@appbaseio/reactivesearch';

const onData = data =>
  <div>
  </div>
;

class HomeSearch extends Component {
    constructor(props) {
      super(props);
     
      this.changeQuery = this.changeQuery.bind(this);
      this.changValue = this.changeValue.bind(this);

    }
 

    changeQuery(prevQuery, nextQuery) {
        console.log('prevQuery', prevQuery.query.bool.must[0].bool.should[0].multi_match.query);
        console.log('nextQuery', nextQuery.query.bool.must[0].bool.should[0].multi_match.query);
    
        this.setState({ redirect: true });
        this.setState({ queryparam: nextQuery.query.bool.must[0].bool.should[0].multi_match.query });
      }

      changeValue(value) {
        console.log(value)
      }
  
    toggleTopic = topic => {
      const { currentTopics } = this.state;
      const nextState = currentTopics.includes(topic) ? currentTopics.filter(item => item !== topic) : currentTopics.concat(topic);
      this.setState({
        currentTopics: nextState
      });
    };
  
    handleClick = () => {
      console.log(this.state);
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
      this.setState({
        currentTopics: ['android']
      });
    };
  
    //   componentWillMount() {
    // 		this.toggleTopic('None')
    // 	}.
  
    render() {
      
      return (
          <div className="home-box">
        <ReactiveBase app="react" url="http://52.179.0.193:3000">
              <CategorySearch
          componentId="homey"
          onQueryChange={this.changeValue}
          filterLabel="Search"
          dataField="mini_name"
          categoryField="categories.lvl1"
          placeholder="Search Items"
          iconPosition="left"
          queryFormat="and"
          autosuggest={true}
          innerClass={{
            input: 'search-input'
          }}
        />
        <ReactiveList
      showResultStats={false}
      componentId="results"
      dataField="upc"
      autoComplete
      onData={data => onData(data)}
      react={{
        and: ['homey']
      }}
      innerClass={{
        list: 'result-list-container',
        pagination: 'result-list-pagination',
        resultsInfo: 'result-list-info',
        poweredBy: 'powered-by'
      }}
    />
        
            </ReactiveBase>
            </div>
      );
    }
  }
  
  export default HomeSearch;