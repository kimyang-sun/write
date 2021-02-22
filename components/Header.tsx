import { Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

const { Search } = Input;

// Props 타입
type StyledHeaderProps = {
  theme: DefaultTheme;
};

// styled compoents
const StyledHeader = styled.header<StyledHeaderProps>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.black};
  padding: 25px 0 15px;
`;

const Logo = styled.h1`
  a {
    display: block;
    padding: 5px;
  }

  img {
    display: block;
    width: 32px;
    height: 32px;
  }
`;

const Nav = styled.nav<StyledHeaderProps>`
  margin-left: auto;
  padding-right: 30px;

  a {
    padding: 5px;
    margin: 0 6px;
    transition: color 0.3s;
  }

  a:hover {
    color: ${props => props.theme.color.main};
  }
`;

// Search Input
const StyledSearch = styled(Search)`
  width: auto;
  margin-left: 30px;
  .ant-input,
  .ant-btn {
    height: 38px;
    line-height: 1;
  }

  .ant-btn {
    padding: 4px 12px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

// export
function Header() {
  return (
    <StyledHeader>
      <Logo>
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="로고" />
          </a>
        </Link>
      </Logo>
      <StyledSearch placeholder="검색" enterButton></StyledSearch>
      <Nav>
        <Link href="/profile">
          <a>프로필</a>
        </Link>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
