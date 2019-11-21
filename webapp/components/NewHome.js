import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'antd';
import { ReactiveBase, CategorySearch, DataSearch, NumberBox, DateRange, RangeSlider, ResultCard, ToggleButton, MultiList, MultiDropdownList, ReactiveList } from '@appbaseio/reactivesearch';
import Brand from './home/Brand';
import Articles from './home/Articles';
import PopularResults from './home/PopularResults';
import Categories from './home/Categories';
import Title from './home/Title';
import Middle from './home/Middle';
import './home/Home.css';

const { Meta } = Card;



class NewHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTopics: this.currentTopics
    };
    this.changeQuery = this.changeQuery.bind(this);
  }

  changeQuery(prevQuery, nextQuery) {
    console.log('prevQuery', prevQuery.query.bool.must[0].bool.should[0].multi_match.query);
    console.log('nextQuery', nextQuery.query.bool.must[0].bool.should[0].multi_match.query);
    this.setState({
      currentTopics: ['None']
    });
    this.setState({ redirect: true });
    this.setState({ queryparam: nextQuery.query.bool.must[0].bool.should[0].multi_match.query });
  }

  render() {
    return (

      <div className="results-container">
            <Helmet>
      <title>PriceBot - The Lowest Price </title>
     
    </Helmet>
        <div className="result-list-popular">
        <Title/>
         <Middle/>
          <PopularResults />
          <Articles />

          {/* <Brand/> */}
         <Categories/>
        </div>
      </div>
    );
  }
}

export default NewHome;
