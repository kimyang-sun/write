import React from 'react';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';
import Header from './Header';
import LoginForm from './LoginForm';
import UserNav from './UserNav';
import Col from 'antd/lib/col';
import { LinkOutlined } from '@ant-design/icons';

// Types
type AppLayoutProps = {
  children: React.ReactNode;
};

// styled compoents
const StyledRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 30px 0;
  margin: 0 -15px;
  > div {
    padding: 0 15px;
  }
  @media (max-width: ${props => props.theme.mediaSize.xlarge}) {
    padding: 15px 0;
  }
`;

const DescriptionCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 8px;

  > * {
    padding: 5px 0;
  }
  .description-logo {
    width: 24px;
  }
  .description-title {
    font-size: 1rem;
    color: ${props => props.theme.color.main};
  }
  .description-tool {
    color: #aaa;
  }
  @media (min-width: ${props => props.theme.mediaSize.xlarge}) {
    position: sticky;
    top: 10px;
  }
  @media (max-width: ${props => props.theme.mediaSize.xlarge}) {
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 24px 0;
    .description-title,
    .description-tool {
      width: 100%;
    }
    a {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
`;

// export
function AppLayout({ children }: AppLayoutProps) {
  const {
    loginLoading,
    loginError,
    logoutLoading,
    logoutError,
    login,
    logout,
    userData,
  } = useUser();
  return (
    <div>
      <Header />
      <StyledRow>
        <Col xs={24} xl={6}>
          {userData ? (
            <UserNav
              loading={logoutLoading}
              logout={logout}
              logoutError={logoutError}
              user={userData}
            />
          ) : (
            <LoginForm
              loading={loginLoading}
              login={login}
              loginError={loginError}
            />
          )}
        </Col>
        <Col xs={24} xl={12}>
          {children}
        </Col>
        <Col xs={24} xl={6}>
          <DescriptionCol>
            <img
              className="description-logo"
              src="/images/logo.png"
              alt="로고"
            />
            <div className="description-title">마음을 적는 공간 "쓰다"</div>
            <div className="description-tool">
              Next.js, Redux-Toolkit, TypeScript···
            </div>
            <a
              href="https://kimyang-sun.tistory.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              블로그 <LinkOutlined />
            </a>
            <a
              href="https://github.com/kimyang-sun/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github <LinkOutlined />
            </a>
          </DescriptionCol>
        </Col>
      </StyledRow>
    </div>
  );
}

export default AppLayout;
