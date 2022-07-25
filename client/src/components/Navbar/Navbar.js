import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { MenuLib } from 'lib';
import ROUTS from 'router/routs';
import { Menu, Button, Row, Col, Avatar } from 'antd';
import { PAGES } from './constants';

import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [currentPage, setCurrentPage] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const currentPathIndex = PAGES.findIndex((item) => location.pathname.includes(item.link));
    if (currentPathIndex >= 0) setCurrentPage(PAGES[currentPathIndex].link);
  }, [location.pathname]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <Row>
      <Col span={2}>
        <Link to={ROUTS.HOME}>Home</Link>
      </Col>
      <Col span={16}>
        <Menu theme="dark" selectedKeys={[currentPage]} mode="horizontal">
          {PAGES.map((menuItem) => (
            <Menu.Item key={menuItem.link}>
              <Link to={menuItem.link}>{menuItem.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
      {user?.result ? (
        <>
          <Col span={1} offset={3}>
            <Avatar src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
          </Col>
          <Col span={2}>
            <Button color="secondary" onClick={logout}>{MenuLib.logout}</Button>
          </Col>
        </>
      ) : (
        <Col span={2} offset={4}>
          <Button component={Link} color="primary">
            <Link to="/auth">{MenuLib.signin}</Link>
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default Navbar;
