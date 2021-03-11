import React, { useEffect } from 'react';
import { UserDataPayload } from 'store/modules/user';
import { Avatar, Button, Card } from 'antd';

// Types
type UserProfileProps = {
  loading: boolean;
  user: UserDataPayload;
  logout: () => void;
  logoutError: string;
};

// export
function UserProfile({ loading, user, logout, logoutError }: UserProfileProps) {
  // 로그아웃 에러
  useEffect(() => {
    if (logoutError) alert(logoutError);
  }, [logoutError]);

  return (
    <Card
      actions={[
        <div key="write">글 {user.Posts.length}</div>,
        <div key="followers">팔로워 {user.Followers.length}</div>,
        <div key="followings">팔로잉 {user.Followings.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname}</Avatar>}
        title={user.nickname}
        description={user.introduction}
      />
      <Button onClick={logout} loading={loading}>
        로그아웃
      </Button>
    </Card>
  );
}

export default UserProfile;
