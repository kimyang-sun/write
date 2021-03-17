import { Avatar } from 'antd';
import React from 'react';

// Types
type UserAvatarProps = {
  avatar?: string;
  nickname: string;
  sizeUp?: boolean;
};

function UserAvatar({ avatar, nickname, sizeUp }: UserAvatarProps) {
  return (
    <>
      {avatar ? (
        <Avatar src={`http://localhost:3006/${avatar}`} size={sizeUp && 80} />
      ) : (
        <Avatar size={sizeUp && 80}>{nickname && nickname.charAt(0)}</Avatar>
      )}
    </>
  );
}

export default React.memo(UserAvatar);
