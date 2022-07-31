import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { getAllTutorials, createTutorial } from 'api';

const { Text } = Typography;
const HomePage = () => {
  const createTutorialHandler = () => {
    createTutorial({
      title: 'test1',
    });
  };
  return (
    <Row>
      <Col span={8}>
        <Button style={{ width: '100%', backgroundColor: '#623415' }}>
          <Text>Город</Text>
        </Button>
      </Col>
      <Col span={8}>
        <Button style={{ width: '100%', backgroundColor: '#623415' }} onClick={createTutorialHandler}>
          <Text>Библиотека</Text>
        </Button>
      </Col>
      <Col span={8}>
        <Button style={{ width: '100%', backgroundColor: '#623415' }} onClick={getAllTutorials}>
          <Text>Казарма</Text>
        </Button>
      </Col>
    </Row>
  );
};

export default HomePage;
