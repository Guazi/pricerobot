import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MultiDropdownList, SingleDropdownRange, RangeSlider, ToggleButton, SingleDataList, ReactiveComponent, SingleList, MultiList } from '@appbaseio/reactivesearch';
import { Link, Switch, Route } from 'react-router-dom';

class CustomComponent extends Component {
  constructor() {
    super();
    this.logThis = this.logThis.bind(this);
  }

  setValue(value) {
    this.props.setQuery({
      query: {
        term: {
          brand: value
        }
      },
      value
    });
  }

  render() {
    if(this.props.aggregations) {
      return this.props.aggregations.brand.buckets.map(item =>
        <div key={item.key} onClick={() => this.setValue(item.key)}>
          {item.key}
        </div>
      );
    }

    return null;
  }
}

const SearchFilters = ({ currentTopics, setTopics, visible, displayFilters }) =>
  <div className={`${!displayFilters ? 'no-display' : ''}`}>
    <div className={`flex column filters-container ${!visible ? 'hidden' : ''}`}>
      {/* <div className="child m10">
  <ReactiveComponent
							componentId="CarSensor"
							defaultQuery={() => ({
								aggs: {
									'brand': {
										terms: {
											field: 'brand',
											order: {
												_count: 'desc',
											},
											size: 100,
										},
									},
								},
							})}
						>
							<CustomComponent />
						</ReactiveComponent>
            </div> */}
      <div className="no-display">
        <SingleList componentId="Category" dataField="categories.lvl4" showRadio={true} showCount={true} showSearch={true} size={400} URLParams />
      </div>

      {/* <div className="child m10">
        <MultiList componentId="Manufacturer" size={10} title="Manfacturer" dataField="manufacturer"  showSearch={false} react={{and: ["Category", "categories-computers", "newrepo"]}} />
      </div> */}
      {/* <div className="child m10">
        <SingleDataList
          onValueChange={function(value) {
            console.log('current value: ', value);
            // set the state
            // use the value with other js code
          }}
          componentId="categories-computers"
          dataField="categories.lvl4"
          title="Computers"
          showSearch={false}
          showRadio={false}
          showFilter={false}
          innerClass={{
            list: 'lister'
          }}
          URLParams
          data={[
            { label: 'Laptops', value: 'Laptops' },
            { label: 'Desktops', value: 'Desktops' },
            { label: 'Tablets', value: 'Tablets' },
            { label: 'Graphics Cards', value: 'Graphics Cards' },
            { label: 'SSD', value: 'Internal Solid State Drives' },
            { label: 'HDD', value: 'Internal Hard Drives' },
            { label: 'External HDD', value: 'External Hard Drives' },
            { label: 'Routers', value: 'Routers' },
            { label: 'Blank Media', value: 'Blank Media' },
            { label: 'RAM', value: 'Memory' },
            { label: 'Memory Cards', value: 'Memory Cards' },
            { label: 'Power Supplies', value: 'Power Supplies' },
            { label: 'Scanners', value: 'Scanners' }
          ]}
        />
      </div> */}
      {/* <div className="child m10">
        <MultiDropdownList
          componentId="topics"
          dataField="categories.lvl1"
          placeholder="Select topics"
          title="Repo Topics"
          filterLabel="Topics"
          size={1000}
          queryFormat="and"
          defaultSelected={currentTopics}
          onValueChange={setTopics}
        />
      </div> */}
    </div>
  </div>
;

SearchFilters.propTypes = {
  currentTopics: PropTypes.arrayOf(PropTypes.string),
  setTopics: PropTypes.func,
  visible: PropTypes.bool
};

export default SearchFilters;
