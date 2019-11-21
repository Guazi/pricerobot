import React from 'react';
import { SelectedFilters, ReactiveList, ResultList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Topic from './Topic';

const onResultStats = (results, time) =>
  <div className="flex justify-end">
    {results} results found in {time}ms
  </div>
;

const onData = (data, currentTopics, toggleTopic) =>
  <div className="result-item" key={data.upc}>
    <div className="flex justify-center align-center result-card-header">
      <Link to={`/item/${data.upc}`}>
        <img className="avatar" src={data.mini.imageurl} alt="User avatar" />
      </Link>
    </div>
    <Link to={`/item/${data.upc}`}>
      <div >{data.mini_name}</div>
    </Link>
    <div className="m10-0">Lowest Price: ${data.mini.price}</div>
  </div>
;

const SearchResults = ({ toggleTopic, currentTopics, smallHeader }) =>
<div className={`${!smallHeader ? 'result-list' : 'result-list-hidden'}`}>

    <SelectedFilters className="m1" />
    <ReactiveList
      componentId="search-results"
      dataField="mini_name"
      autoComplete
      onData={data => onData(data, currentTopics, toggleTopic)}
      onResultStats={onResultStats}
      react={{
        and: ['repoer']
      }}
      pagination
      innerClass={{
        list: 'result-list-container',
        pagination: 'result-list-pagination',
        resultsInfo: 'result-list-info',
        poweredBy: 'powered-by'
      }}
      size={12}
      sortOptions={[
        {
          label: 'Best Match',
          dataField: 'salesrank',
          sortBy: 'asc'
        },
        {
          label: '$ Low-to-High',
          dataField: 'mini.price',
          sortBy: 'asc'
        },
        {
          label: '$ High-to-Low',
          dataField: 'mini.price',
          sortBy: 'desc'
        }
      ]}
    />
  </div>
;

SearchResults.propTypes = {
  toggleTopic: PropTypes.func,
  currentTopics: PropTypes.arrayOf(PropTypes.string)
};

export default SearchResults;
