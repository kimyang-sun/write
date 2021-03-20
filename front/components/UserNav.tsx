import React, { useEffect } from 'react';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import styled from 'styled-components';
import { UserDataPayload } from 'store/modules/user';
import {
  LikeOutlined,
  EditOutlined,
  TeamOutlined,
  ApiOutlined,
} from '@ant-design/icons';

// Types
type UserNavProps = {
  loading: boolean;
  user: UserDataPayload;
  logout: () => void;
  logoutError: string;
};

// styled components
const StyledUserNav = styled.nav`
  ul > li {
    margin-bottom: 15px;
  }
  ul > li > a {
    font-size: 2rem;
    border: 2px solid ${props => props.theme.color.gray};
    display: inline-block;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
  }
  ul > li > a:hover {
    border-color: ${props => props.theme.color.main};
  }
  ul > li > a svg {
    transition: all 0.3s;
    color: ${props => props.theme.color.gray};
  }
  ul > li > a:hover svg {
    color: ${props => props.theme.color.main};
  }
  @media (min-width: ${props => props.theme.mediaSize.xlarge}) {
    position: sticky;
    top: 10px;
  }
  @media (max-width: ${props => props.theme.mediaSize.xlarge}) {
    margin-bottom: 40px;
    ul {
      display: flex;
    }
    ul > li {
      margin: 0;
      margin-right: 10px;
    }
  }
  @media (max-width: ${props => props.theme.mediaSize.small}) {
    ul {
      justify-content: space-between;
    }
    ul > li {
      margin-right: 0;
    }
  }
`;

// export
function UserNav({ user, logout, logoutError }: UserNavProps) {
  // 로그아웃 에러
  useEffect(() => {
    if (logoutError) alert(logoutError);
  }, [logoutError]);

  return (
    <>
      <StyledUserNav>
        <ul>
          <li>
            <UserAvatar
              avatar={user.avatar}
              nickname={user.nickname}
              id={user.id}
            />
          </li>
          <li>
            <Link href="/profile">
              <a key="edit">
                <EditOutlined />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/follow">
              <a key="followers">
                <TeamOutlined />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a key="likes">
                <LikeOutlined />
              </a>
            </Link>
          </li>
          <li>
            <a key="logout" onClick={logout}>
              <ApiOutlined />
            </a>
          </li>
        </ul>
      </StyledUserNav>
    </>
  );
}

export default UserNav;
