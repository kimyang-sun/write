import { Col, Row } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

// Props 타입
type AppLayoutProps = {
  children: React.ReactNode;
};

// styled compoents
const StyledRow = styled(Row)`
  padding-top: 30px;
`;

// export
function AppLayout({ children }: AppLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Header />
      <StyledRow gutter={30}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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
