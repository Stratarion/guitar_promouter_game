import React from 'react';
import { Row, Col } from 'antd';
import { Benefits } from './components';

const HomePage = () => (
  <Row>
    <Col span={24}>
      <Benefits />
    </Col>
  </Row>
);

export default HomePage;
