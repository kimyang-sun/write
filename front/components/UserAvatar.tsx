import { Avatar } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

// Types
type UserAvatarProps = {
  avatar?: string;
  nickname: string;
  sizeUp?: boolean;
  id: number;
};

const StyledAvatar = styled(Avatar)`
  :hover {
    opacity: 0.8;
  }
`;

function UserAvatar({ avatar, nickname, sizeUp, id }: UserAvatarProps) {
  return (
    <Link href={`/user/${id}`}>
      <a>
        {avatar ? (
          <StyledAvatar
            src={`http://localhost:3006/${avatar}`}
            size={sizeUp && 80}
          />
        ) : (
          <StyledAvatar size={sizeUp && 80}>
            {nickname && nickname.charAt(0)}
          </StyledAvatar>
        )}
      </a>
    </Link>
  );
}

export default React.memo(UserAvatar);
