import React from 'react';
import { SelectedFilters, ReactiveList, ResultList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';



const onResultStats = (results, time) =>
  <div className="flex justify-end">
    {results} results found in {time}ms
  </div>
;

const onData = (data, currentTopics, toggleTopic) => {
  let doer;
    if (data.mini_name.length > 100) {
      doer = data.mini_name.substring(0, 97) + '...';
      }
      else {
        doer = data.mini_name;
      }
 
  
  return (
    <div className="result-item" key={data.upc}>
      <Helmet>
        <title>PriceBot - The Lowest Price </title>
      </Helmet>
      <div className="flex justify-center align-center result-card-header">
        <Link to={`/item/${data.upc}`}>
          <img className="avatar" src={data.mini.imageurl} alt="User avatar" />
        </Link>
      </div>
      <div>
      <Link to={`/item/${data.upc}`}>
        <div className="result-name">{doer}</div>
      </Link>
      </div>
      <div>
      <div className="m10-0">Price: ${data.mini.price}</div>
      <div>   <MuiThemeProvider>
        <div className="flex justify-center align-center">
          <RaisedButton primary={true} href={data.mini.url} target="_blank" label={'BUY IT'} />
        </div>
      </MuiThemeProvider> </div>
      </div>
    </div>
  );
};

const Results = ({ toggleTopic, currentTopics, smallHeader }) =>
  <div className={`${!smallHeader ? 'result-list' : 'result-list-hidden'}`}>
    <SelectedFilters className="m1" />
    <ReactiveList
      componentId="results"
      dataField="mini_name"
      autoComplete
      onData={data => onData(data, currentTopics, toggleTopic)}
      onResultStats={onResultStats}
      react={{
        and: ['categories-computers', 'topics', 'repo', 'repoer', 'Category', 'Manufacturer', 'newrepo']
      }}
      pagination
      URLParams
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
          dataField: 'webrank',
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

Results.propTypes = {
  toggleTopic: PropTypes.func,
  currentTopics: PropTypes.arrayOf(PropTypes.string)
};

export default Results;
