import React, { Component } from 'react';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import Mychart from './Mychart';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Barcode from 'react-barcode';
import { Helmet } from 'react-helmet';
import './single/Single.css';


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
        ${record.price.$numberDecimal}
      </a>

  }
  // {
  //   title: 'Stock',
  //   dataIndex: 'stock',
  //   key: 'stock'
  // }
];

class Single extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datum: [],
      mini: []
    };
  }

  componentDidMount() {
    const api = 'http://52.179.0.193:5000/item?upc=';
    const cater = this.props.match.params.id;
    fetch(api + cater)
      .then(results => results.json())
      .then(data => {
        this.setState({ datum: data });
        this.setState({ mini: data.mini });
        console.log('singlestate', this.state.datum);
      });
  }

  render() {
    return (
      <div className="flex row-reverse app-container">
        {this.state
          && this.state.mini.length != 0
          && this.state.datum.length != 0
            && <Helmet>
              <title>{this.state.mini.name} | PriceBot - The Lowest Price</title>
              {!this.state.datum.model &&
              <meta
                name="description"
                content={`Lowest price found is $${this.state.mini.price.$numberDecimal} | ${this.state.mini.name} | UPC: ${this.state.datum.upc} | ASIN: ${
                  this.state.datum.asin
                } | Click here for the lowest price and product details.`}
              />}
              {this.state.datum.model &&
              <meta
                name="description"
                content={`Lowest price found is $${this.state.mini.price.$numberDecimal} | ${this.state.mini.name} | UPC: ${this.state.datum.upc} | ASIN: ${
                  this.state.datum.asin
                } | MPN: ${this.state.datum.model} | Click here for the lowest price and product details.`}
              />}
            </Helmet>
        }
        <nav className="navbar-main">
          <Link to="/">
            <div className="title-single">PriceBot</div>
          </Link>
        </nav>
        <div className="results-container">
          <div className="result-list-single">
            <div className="results-list-container">
              <div key={this.state.datum.upc}>
                <Row>
                  <div className="flex justify-center align-center">
                    <img className="avatar" src={this.state.mini.imageurl} alt="User avatar" />
                  </div>
                </Row>
                <Row className="m10">
                  <div className="flex justify-center align-center">
                    <h5>{this.state.datum.mini_name}</h5>
                  </div>
                </Row>
                {this.state
                  && this.state.mini.length != 0
                    && <div>
                      <Row className="m10">
                        <div className="align-center">
                          Lowest Price: <span> ${this.state.mini.price.$numberDecimal}</span>
                        </div>
                      </Row>
                      <Row className="m10">
                        <MuiThemeProvider>
                          <div className="flex justify-center align-center">
                            <RaisedButton primary={true} href={this.state.mini.url} target="_blank" label={`Go to ${this.state.mini.retailer}`} />
                          </div>
                        </MuiThemeProvider>
                      </Row>
                    </div>
                }
                <Row type="flex" justify="center" align="middle">
                  <Col span={24}>
                    <div className="flex justify-center align-center">
                      <Barcode width={1} height={50} format="UPC" value={this.state.datum.upc} />
                    </div>
                  </Col>
                </Row>
                <Row className="m10" type="flex" justify="center">
                  <Col className="flex justify-center align-center" span={6} offset={1}>
                    ASIN: {this.state.datum.asin}
                  </Col>
                  <Col className="flex justify-center align-center" span={8} offset={2}>
                    MPN: {this.state.datum.model}
                  </Col>
                </Row>
                <Row>
                  <div className="flex justify-center align-center">Price History: </div>
                </Row>

                <Mychart upc={this.state.datum.upc} />

                <Row className="price-table">
                  <Table pagination={false} dataSource={this.state.datum.retailers} columns={columns} />
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Single;
