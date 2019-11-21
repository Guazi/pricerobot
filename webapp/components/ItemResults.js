import React from 'react';
import { ReactiveList } from '@appbaseio/reactivesearch';
import { Row, Col, Layout, Table } from 'antd';
import { Grid } from 'react-bootstrap';

import Topic from './Topic';
import Mychart from './Mychart';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Barcode from 'react-barcode';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Helmet } from 'react-helmet';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const { Header, Content, Footer, Sider } = Layout;

const onResultStats = (results, time) =>
  <div className="flex justify-end">
    {results} results found in {time}ms
  </div>
;

const columns = [
  {
    title: 'Retailer',
    dataIndex: 'retailer',
    key: 'retailer',
    render: (text, record) =>
      <a target="_blank" href={record.url}>
        {record.retailer}
      </a>

  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text, record) =>
      <a target="_blank" href={record.url}>
        ${record.price}
      </a>

  }
  // {
  //   title: 'Stock',
  //   dataIndex: 'stock',
  //   key: 'stock'
  // }
];

const onData = data =>
  <div className="width-90" key={data.upc}>
    <Helmet>
      <title>{data.mini_name} | PriceBot - The Lowest Price </title>
      {!data.model
        && <meta
          name="description"
          content={`Lowest price found is $${data.mini.price} | ${data.mini.name} | UPC: ${data.upc} | ASIN: ${data.asin} | Click here for the lowest price and product details.`}
        />
      }
      {data.model
        && <meta
          name="description"
          content={`Lowest price found is $${data.mini.price} | ${data.mini.name} | UPC: ${data.upc} | ASIN: ${data.asin} | MPN: ${data.model} | Click here for the lowest price and product details.`}
        />
      }
    </Helmet>
    <Row>
      <div className="flex justify-center align-center">
        <img className="avatar" src={data.mini.imageurl} alt="User avatar" />
      </div>
    </Row>
    <Row className="m10">
      <div className="flex justify-center align-center">{data.mini_name}</div>
    </Row>
    <Row className="m10">
      <div className="flex justify-center align-center">
        Lowest Price: <span> ${data.mini.price}</span>
      </div>
    </Row>
    <Row className="m10">
      <MuiThemeProvider>
        <div className="flex justify-center align-center">
          <RaisedButton primary={true} href={data.mini.url} target="_blank" label={`Go to ${data.mini.retailer}`} />
        </div>
      </MuiThemeProvider>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col span={24}>
        <div className="flex justify-center align-center">
          <Barcode width="1" height="50" format="UPC" value={data.upc} />
        </div>
      </Col>
    </Row>
    <Row className="m10" type="flex" justify="center">
      <Col className="flex justify-center align-center" span={6} offset={1}>
        ASIN: {data.asin}
      </Col>
      <Col className="flex justify-center align-center" span={8} offset={2}>
        MPN: {data.model}
      </Col>
    </Row>
    <Row>
      <div className="flex justify-center align-center">Price History: </div>
    </Row>

    <Mychart upc={data.upc} />

    <Row className="price-table">
      <Table pagination={false} dataSource={data.retailers} columns={columns} />
    </Row>
  </div>
;

const ItemResults = () =>
  <div className="result-list-item">
    <ReactiveList
      showResultStats={false}
      componentId="results"
      dataField="upc"
      autoComplete
      onData={data => onData(data)}
      react={{
        and: ['repos']
      }}
      innerClass={{
        list: 'result-list-container',
        pagination: 'result-list-pagination',
        poweredBy: 'powered-by'
      }}
    />
  </div>
;

export default ItemResults;
