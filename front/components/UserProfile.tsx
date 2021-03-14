import React, { useEffect } from 'react';
import { UserDataPayload } from 'store/modules/user';
import { Avatar, Button, Card } from 'antd';
import styled from 'styled-components';

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
        <div key="write">글 {user.Posts.length}</div>,
        <div key="followers">팔로워 {user.Followers.length}</div>,
        <div key="followings">팔로잉 {user.Followings.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={
          user.avatar ? (
            <Avatar src={user.avatar} />
          ) : (
            <Avatar>{user.nickname.charAt(0)}</Avatar>
          )
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
