import { Avatar, Button, Card } from 'antd';
import React from 'react';
import { UserDataPayload } from 'store/modules/user';

// Types
type UserProfileProps = {
  loading: boolean;
  user: UserDataPayload;
  logout: () => void;
};

// export
function UserProfile({ loading, user, logout }: UserProfileProps) {
  return (
    <Card
      actions={[
        <div key="write">글 수 0</div>,
        <div key="following">팔로워 0</div>,
        <div key="followers">팔로잉 0</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname}</Avatar>}
        title={user.nickname}
        description={user.description}
      />
      <Button onClick={logout} loading={loading}>
        로그아웃
      </Button>
    </Card>
  );
}

export default UserProfile;
