import React from 'react';
import { MainLib } from 'lib';
import { PageContainer } from 'components';
import { Card, Row, Col, Button, Typography } from 'antd';
import { showDateAsString } from 'utils';

const { Meta } = Card;
const { Text, Title } = Typography;

const mockData = {
  lastFinishTime: new Date(2022, 6, 20, 18, 0, 0, 0),
  totalResult: 313141241513123,
};

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

// страница со всеми работниками
const PageProfile = () => {
  const [changeIsOpen, setChangeIsOpen] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [lastFinishTime, setLastFinishTime] = React.useState(null);
  const [totalResult, setTotalResult] = React.useState(0);
  const [showTime, setShowTime] = React.useState(null);
  const timer = React.useRef(null);

  const toggleChange = () => {
    setChangeIsOpen(!changeIsOpen);
    if (changeIsOpen) {
      const finishTime = new Date();
      // Для вывода в секундах, далее нужно будет преобразовать, чтобы вывод парсился на дни и минуты
      setLastFinishTime(finishTime);

      // Результат складывается в милисекундах, для вывода надо преобразовывать соответствующе
      setTotalResult(totalResult + (finishTime - startTime));
      // Обнуление счетчика смены
      setStartTime(null);
      clearInterval(timer.current);
    } else {
      const currentTime = new Date();
      const intervalId = setInterval(() => {
        setShowTime(new Date() - currentTime);
      }, 1000);

      // каждую секунду обновляет счетчик времени
      timer.current = intervalId;
      // запуска счетчика для смены, должен сразу отсылаться на бэк, при заходе на станицу проверяться его наличие
      setStartTime(currentTime);
    }
  };

  const useMockData = () => {
    setLastFinishTime(mockData.lastFinishTime);
    setTotalResult(mockData.totalResult);
  };

  // const showTimeResult = (time) => (new Date() - time) / 1000;

  return (
    <PageContainer>
      <Title level={2}>{MainLib.profile.title}</Title>
      <Row>
        <Col span={4}>
          <Card
            hoverable
            style={{ width: 240, height: 300 }}
            cover={<img alt="example" src="https://st.depositphotos.com/2547675/3009/i/450/depositphotos_30094505-stock-photo-time-clock.jpg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={4}>
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <Text>{changeIsOpen ? 'Смена открыта' : 'Смена закрыта'}</Text>
            </Col>
            <Col span={24}>
              <Button onClick={useMockData}>Использовать тестовые данные</Button>
            </Col>
            <Col span={24}>
              <Button onClick={toggleChange}>{changeIsOpen ? MainLib.buttons.clouseChange : MainLib.buttons.openChange}</Button>
            </Col>
            <Col span={24}>
              <Text>{MainLib.profile.startTime}</Text>
            </Col>
            {startTime ? (
              <Col span={24}>
                <Text>{showDateAsString(showTime)}</Text>
              </Col>
            )
              : (
                <Col span={24}>
                  <Text>Сессия не начата</Text>
                </Col>
              )}
          </Row>
        </Col>
        <Col span={6}>
          <Title level={3}>{MainLib.profile.statistic}</Title>
          <Text>{MainLib.profile.lastFinishTime}</Text>
          <br />
          <Text>{lastFinishTime ? lastFinishTime.toLocaleString('ru', options) : MainLib.profile.noLastChange}</Text>
          <br />
          <Text>{MainLib.profile.totalResult}</Text>
          <br />
          <Text>{showDateAsString(totalResult?.toString())}</Text>
          <br />
          <br />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default PageProfile;
