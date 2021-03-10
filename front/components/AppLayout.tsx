import { Col, Row } from 'antd';
import React from 'react';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';
import Header from './Header';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

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
  const { loginLoading, logoutLoading, login, logout, userData } = useUser();
  return (
    <div>
      <Header />
      <StyledRow gutter={{ xs: 0, sm: 20, lg: 30, xl: 40 }}>
        <Col xs={24} xl={6}>
          {userData ? (
            <UserProfile
              loading={logoutLoading}
              logout={logout}
              user={userData}
            />
          ) : (
            <LoginForm loading={loginLoading} login={login} />
          )}
        </Col>
        <Col xs={24} xl={12}>
          {children}
        </Col>
        <Col xs={24} xl={6}>
          오른쪽
        </Col>
      </StyledRow>
    </div>
  );
}

export default AppLayout;
