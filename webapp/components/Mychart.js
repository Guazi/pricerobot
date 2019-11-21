import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class Mychart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartdata: []
    };
  }


  componentDidMount() {
    const api = 'http://52.179.0.193:5000/history?upc=';
    const cater = this.props.upc;
    fetch(api + cater)
      .then(results => results.json())
      .then(data => {
        this.setState({ chartdata: data });
       
        console.log('chartstate', this.state.chartdata);
      });
  }


  render() {
    return (
      <div className="max-700-width left-right-auto">
        {this.state.chartdata
          && <ResponsiveContainer aspect={3}>
            <LineChart
              data={this.state.chartdata.history}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <XAxis dataKey="thisdate" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line connectNulls={true} type="monotone" name="Newegg" dataKey="Newegg" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Newegg Business" dataKey="Newegg Business" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Lowe's" dataKey="Lowe's" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Home Depot" dataKey="Home Depot" stroke="#8884d8" fill="#8884d8" />

              <Line connectNulls={true} type="monotone" name="Target" dataKey="Target" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Amazon" dataKey="amazon" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Best Buy" dataKey="Best Buy" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Dick's Sporting Goods" dataKey="Dick's Sporting Goods" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="BH Photo" dataKey="bh" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="REI" dataKey="rei" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Frys" dataKey="frys" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Staples" dataKey="staples" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Office Depot" dataKey="Office Depot and OfficeMax" stroke="#8884d8" fill="#8884d8" />
              <Line connectNulls={true} type="monotone" name="Shoplet" dataKey="Shoplet" stroke="#8884d8" fill="#8884d8" />

              <Line connectNulls={true} type="monotone" name="Overstock" dataKey="Overstock" stroke="#8884d8" fill="#8884d8" />

              <Line connectNulls={true} type="monotone" name="Microcenter" dataKey="microcenter" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        }
      </div>
    );
  }
}

export default Mychart;
