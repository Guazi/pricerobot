import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Rsearch from './components/Rsearch';
import Single from './components/Single';
import withTracker from './withTracker';

import './App.css';

class App extends Component {
  
  //   componentWillMount() {
  // 		this.toggleTopic('None')
  // 	}

  render() {
    return (
     
        <Switch>


          <Route exact path="/single/:id" component={withTracker(Single, { /* additional attributes */ } )}/>

          <Route exact path="/" component={withTracker(Rsearch, { /* additional attributes */ } )} />
          <Route exact path="/search" component={withTracker(Rsearch, { /* additional attributes */ } )} />
          <Route exact path="/item/:id" component={withTracker(Rsearch, { /* additional attributes */ } )} />
          <Route exact path="/testhome" component={withTracker(Rsearch, { /* additional attributes */ } )} />

        </Switch>
    );
  }
}

export default App;
