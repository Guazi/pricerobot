import React from 'react';
import { Col, Row, List } from 'antd';

const Brand = () =>
  <div>
    <Row type="flex" justify="center" className="brand-top-bottom">
      <Col xs={4} md={2}>
        <img alt="Samsung" className="w100-h100px m10 flex" src="/samsung.svg" />
      </Col>
      <Col xs={4} md={2}>
        <img alt="Apple" className="w100-h100px m10 flex" src="/apple.svg" />
      </Col>
      <Col xs={4} md={2}>
        <img alt="Logitech" className="w100-h100px m10 flex" src="/logitech.svg" />
      </Col>
      <Col xs={4} md={2}>
        <img alt="Sony" className="w100-h100px m10 flex" src="/sony.svg" />
      </Col>
      <Col xs={4} md={2}>
        <img alt="Dell" className="w100-h100px m10 flex" src="/dell.svg" />
      </Col>
      <Col xs={4} md={2}>
        <img alt="Nvidia" className="w100-h100px m10 flex" src="/nvidia.svg" />
      </Col>
    </Row>
  </div>
;

// SearchResults.propTypes = {
//   toggleTopic: PropTypes.func,
//   currentTopics: PropTypes.arrayOf(PropTypes.string)
// };

export default Brand;
