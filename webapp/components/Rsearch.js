import React, { Component } from 'react';
import { ReactiveBase, CategorySearch } from '@appbaseio/reactivesearch';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import MainResults from './MainResults';
import Item from './Item';
import NewHome from './NewHome';

class Rsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTopics: this.currentTopics
    };
    this.changeQuery = this.changeQuery.bind(this);
  }

  setTopics = currentTopics => {
    this.setState({
      currentTopics: currentTopics || []
    });
  };

  toggleTopic = topic => {
    const { currentTopics } = this.state;
    const nextState = currentTopics.includes(topic) ? currentTopics.filter(item => item !== topic) : currentTopics.concat(topic);
    this.setState({
      currentTopics: nextState
    });
  };

  changeQuery(value) {
    console.log('nextQuery', value);
    this.setState({
      currentTopics: ['None']
    });
    this.setState({ redirect: true });
    this.setState({ queryparam: value });
  }

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
  // 	}

  render() {
    if(this.state.redirect) {
      return <Redirect push to={`/search/?newrepo="${this.state.queryparam}"`} />;
    }
    return (
      <ReactiveBase app="react" url="http://52.179.0.193:3000">
        <div className="flex row-reverse app-container">
          <Header currentTopics={this.state.currentTopics} setTopics={this.setTopics} />
          <Switch>
            <Route exact path="(/|/search)">
              <CategorySearch
                componentId="newrepo"
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
                onValueSelected={this.changeQuery}
              />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/" component={NewHome} />
            {/* <Route exact path="/search/:id" component={Search} /> */}
            <Route exact path="/search" component={MainResults} />
            <Route exact path="/item/:id" component={Item} />
            <Route exact path="/testhome" component={NewHome} />
          </Switch>
        </div>
      </ReactiveBase>
    );
  }
}

export default Rsearch;
