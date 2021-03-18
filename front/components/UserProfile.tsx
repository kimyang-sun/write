import React, { useEffect } from 'react';
import { UserDataPayload } from 'store/modules/user';
import { Avatar, Button, Card } from 'antd';
import styled from 'styled-components';
import UserAvatar from './UserAvatar';
import Link from 'next/link';

// Types
type UserProfileProps = {
  loading: boolean;
  user: UserDataPayload;
  logout: () => void;
  logoutError: string;
};

// styled components
const ProfileCard = styled(Card)`
  .ant-btn {
    margin-top: 15px;
  }

  .ant-card-body {
    text-align: right;
  }
  .ant-card-body button {
    margin-left: auto;
  }

  .ant-card-meta-detail {
    text-align: left;
  }
  @media (max-width: ${props => props.theme.mediaSize.xlarge}) {
    margin-bottom: 30px;
  }
`;

// export
function UserProfile({ loading, user, logout, logoutError }: UserProfileProps) {
  // 로그아웃 에러
  useEffect(() => {
    if (logoutError) alert(logoutError);
  }, [logoutError]);

  return (
    <ProfileCard
      actions={[
        <Link href={`/user/${user.id}`}>
          <a key="writes">글 {user.Posts.length}</a>
        </Link>,
        <Link href="/profile">
          <a key="followers">팔로워 {user.Followers.length}</a>
        </Link>,
        <Link href="/profile">
          <a key="followings">팔로잉 {user.Followings.length}</a>
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={
          <UserAvatar
            avatar={user.avatar}
            nickname={user.nickname}
            id={user.id}
          />
        }
        title={user.nickname}
        description={user.introduction}
      />
      <Button onClick={logout} loading={loading}>
        로그아웃
      </Button>
    </ProfileCard>
  );
}

export default UserProfile;
