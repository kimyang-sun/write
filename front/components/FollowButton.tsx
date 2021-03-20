import React, { useCallback } from 'react';
import useUser from 'store/modules/userHook';
import { Post } from 'store/modules/post';
import Button from 'antd/lib/button';
import styled from 'styled-components';

// Types
type FollowButtonProps = {
  post: Post;
};

// styled components
const StyledFollowButton = styled(Button)`
  padding: 0 8px;
  margin-left: 12px;

  @media (max-width: ${props => props.theme.mediaSize.small}) {
    font-size: 0.813rem;
  }
`;

function FollowButton({ post }: FollowButtonProps) {
  const {
    userData,
    follow,
    followLoading,
    unFollowLoading,
    unFollow,
  } = useUser();

  // 사용자의 팔로잉에서 해당 게시글 작성자의 id와 일치하는것이 있는지 판단합니다. (게시글 작성자 팔로잉 유무)
  const isFollowing =
    userData && userData.Followings.find(value => value.id === post.User.id);

  const onFollow = useCallback(() => {
    if (isFollowing) {
      unFollow(post.User.id);
    } else {
      follow(post.User.id);
    }
  }, [isFollowing]);

  return (
    <StyledFollowButton
      loading={followLoading || unFollowLoading}
      onClick={onFollow}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </StyledFollowButton>
  );
}
export default React.memo(FollowButton);
