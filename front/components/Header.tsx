import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled, { DefaultTheme } from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

// Types
type StyledHeaderProps = {
  theme: DefaultTheme;
};

// styled compoents
const StyledHeader = styled.header<StyledHeaderProps>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.black};
  padding: 25px 0 15px;

  @media (max-width: ${props => props.theme.mediaSize.small}) {
    flex-wrap: wrap;
  }
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
  padding-left: 30px;

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
  margin-left: auto;
  .ant-input,
  .ant-btn {
    height: 38px;
    line-height: 1;
  }

  .ant-btn {
    width: auto;
    padding: 4px 10px;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: ${props => props.theme.mediaSize.small}) {
    width: 100%;
    margin-top: 15px;
  }
`;

// export
function Header() {
  const [searchInput, setSearchInput] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <StyledHeader>
      <Logo>
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="로고" />
          </a>
        </Link>
      </Logo>
      <Nav>
        <Link href="/profile">
          <a>프로필</a>
        </Link>
      </Nav>
      <StyledSearch
        placeholder="해시태그 검색"
        value={searchInput}
        onChange={onChange}
        onSearch={onSearch}
      ></StyledSearch>
    </StyledHeader>
  );
}

export default React.memo(Header);
