import React from 'react';
import { Card, Col, Row, List } from 'antd';
const { Meta } = Card;

const articles = [
    {
      title: 'Welcome To The PriceBot',
      image: '/pb.png',
      header: 'The Best Activity Trackers of 2018: Which should you Buy?',
      description: 'We are just getting started.'
    },
    {
      title: "What's Hot",
      image: '/trending.png',
      header: 'The 2017 Holiday Gift Guide',
      description: 'We take a look at what people are talking about in 2018.'
    },
    {
      title: 'Electronics',
      image: '/digicam.jpg',
      header: 'Top 10 Digital Cameras of 2017',
      description: 'Top electronics.'
    }
  ];

const Articles = () =>
<div>
<Row type="flex" justify="center" align="top">
<Col xs={24} md={12}>
  <h4 className="align-center">Recent Articles</h4>
</Col>
</Row>
<Row type="flex" justify="center" >
<List
  grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
  dataSource={articles}
  renderItem={test =>
    <List.Item>
      <div className="cat-card">
      <Card  cover={<img alt="example" src={test.image} />}>
        <Meta title={test.title} description={test.description} />
      </Card>
      </div>
    </List.Item>
  }
/>
</Row>
  </div>
;

// SearchResults.propTypes = {
//   toggleTopic: PropTypes.func,
//   currentTopics: PropTypes.arrayOf(PropTypes.string)
// };

export default Articles;
