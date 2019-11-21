import React from 'react';
import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row, Icon } from 'antd';

const onResultStats = (results, time) =>
  <div className="flex justify-end">
    {results} results found in {time}ms
  </div>
;

const onData = (data, currentTopics, toggleTopic) => {
  const ds = data.mini_name.slice(0, 90);
  let doer;
  if(data.mini_name.length > 90) {
    doer = `${data.mini_name.substring(0, 87)}...`;
  } else {
    doer = data.mini_name;
  }

  return (
    <div className="result-item-popular" key={data.upc}>
      <div className="flex justify-center align-center result-card-header">
        <Link to={`/item/${data.upc}`}>
          <img className="avatar-popular" src={data.mini.imageurl} alt="Item Image" />
        </Link>
      </div>
      <Link to={`/item/${data.upc}`}>
        <div className="height-100">{doer}</div>
      </Link>
      <div className="m10-0">Lowest Price: ${data.mini.price}</div>
    </div>
  );
};

const PopularResults = ({ toggleTopic, currentTopics, smallHeader }) =>
  <div>
    <Row type="flex" justify="center" align="top">
      <Col xs={24} md={12}>
        <h4 className="align-center">Popular Items</h4>
      </Col>
    </Row>
    <div className="popular-container">
      <Row type="flex" justify="center" align="top">
        <Col xs={24} md={15}>
          <div className="app-container">
            <ReactiveList
              componentId="results"
              dataField="webrank"
              showResultStats={false}
              sortBy="asc"
              onData={data => onData(data, currentTopics, toggleTopic)}
              react={{
                and: ['newrepo']
              }}
              pagination
              innerClass={{
                list: 'result-list-container-popular',
                pagination: 'result-list-pagination-popular',
                resultsInfo: 'no-display',
                poweredBy: 'powered-by'
              }}
              size={4}
              URLParams
            />
          </div>
        </Col>
        <Col xs={0} md={4}>
          <Link to={'/search'}>
            <Icon className="more-icon" type="fast-forward">
              {' '}
              <div className="more-icon-text">Show All</div>{' '}
            </Icon>{' '}
          </Link>{' '}
        </Col>
      </Row>
    </div>
  </div>
;

PopularResults.propTypes = {
  toggleTopic: PropTypes.func,
  currentTopics: PropTypes.arrayOf(PropTypes.string)
};

export default PopularResults;
