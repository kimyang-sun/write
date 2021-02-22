import { Avatar, Button, Card } from 'antd';
import React from 'react';

// Props 타입
type UserProfileProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserProfile({ setIsLoggedIn }: UserProfileProps) {
  return (
    <Card
      actions={[
        <div key="write">글 수 0</div>,
        <div key="following">팔로잉 0</div>,
        <div key="followers">팔로워 0</div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>선양</Avatar>} title="kimsun-Yang" />
      <Button onClick={() => setIsLoggedIn(false)}>로그아웃</Button>
    </Card>
  );
}

export default UserProfile;
