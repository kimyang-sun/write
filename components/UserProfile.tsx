import { Avatar, Button, Card } from 'antd';
import React from 'react';

// Types
type UserProfileProps = {
  logout: () => void;
};

// export
function UserProfile({ logout }: UserProfileProps) {
  return (
    <Card
      actions={[
        <div key="write">글 수 0</div>,
        <div key="following">팔로워 0</div>,
        <div key="followers">팔로잉 0</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>선양</Avatar>}
        title="kimsun-Yang"
        description="배움을 즐기는 개발자입니다."
      />
      <Button onClick={logout}>로그아웃</Button>
    </Card>
  );
}

export default UserProfile;
