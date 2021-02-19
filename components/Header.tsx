import Link from 'next/link';
import React from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

type StyledHeaderProps = {
  theme: DefaultTheme;
};

const StyledHeader = styled.header<StyledHeaderProps>`
  display: flex;
  align-items: center;
  ${props => {
    const color = props.theme.color.black;
    return css`
      color: ${color};
    `;
  }}
`;

const Logo = styled.div`
  display: flex;
  margin-right: 20px;

  img {
    width: 36px;
    height: 36px;
  }

  h1 {
    font-family: 'Noto Serif KR', serif;
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

const Nav = styled.nav``;

function Header() {
  return (
    <StyledHeader>
      <Logo>
        <img src="/images/logo.png" alt="로고" />
        <h1>쓰다</h1>
      </Logo>
      <Nav>
        <Link href="/">
          <a>홈</a>
        </Link>
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
