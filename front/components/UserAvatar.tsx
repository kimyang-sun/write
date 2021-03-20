import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Avatar from 'antd/lib/avatar';

// Types
type UserAvatarProps = {
  avatar?: string;
  nickname: string;
  sizeUp?: boolean;
  id: number;
};

const StyledAvatar = styled(Avatar)`
  transition: opacity 0.3s;
  :hover {
    opacity: 0.8;
  }
`;

function UserAvatar({ avatar, nickname, sizeUp, id }: UserAvatarProps) {
  return (
    <Link href={`/user/${id}`} prefetch={false}>
      <a>
        {avatar ? (
          <StyledAvatar src={avatar} size={sizeUp ? 80 : 40} />
        ) : (
          <StyledAvatar size={sizeUp ? 80 : 40}>
            {nickname && nickname.charAt(0)}
          </StyledAvatar>
        )}
      </a>
    </Link>
  );
}

export default React.memo(UserAvatar);
