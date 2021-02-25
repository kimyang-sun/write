import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import useUser from 'store/modules/userHook';

// Types
type AppLayoutProps = {
  children: React.ReactNode;
};

// styled compoents
const StyledRow = styled(Row)`
  padding-top: 30px;
`;

// export
function AppLayout({ children }: AppLayoutProps) {
  const { isLoggedIn, login, logout } = useUser();
  return (
    <div>
      <Header />
      <StyledRow gutter={30}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile logout={logout} />
          ) : (
            <LoginForm login={login} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          오른쪽
        </Col>
      </StyledRow>
    </div>
  );
}

export default AppLayout;
