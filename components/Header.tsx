import Link from 'next/link';
import React from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import Input from './Input';

// Props Type
type StyledHeaderProps = {
  theme: DefaultTheme;
};

// Header
const StyledHeader = styled.header<StyledHeaderProps>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.black};
  padding: 15px 0;
`;

// Logo
const Logo = styled.h1`
  a {
    display: block;
    padding: 5px;
  }

  img {
    display: blcok;
    width: 30px;
    height: 30px;
  }
`;

// Nav
const Nav = styled.nav`
  margin-left: auto;
  padding-right: 30px;

  a {
    padding: 5px;
    margin: 0 6px;
    transition: opacity 0.3s;
  }

  a:hover {
    opacity: 0.7;
  }
`;

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
      <Input kind="search" />
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
