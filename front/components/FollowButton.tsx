import React, { useCallback } from 'react';
import useUser from 'store/modules/userHook';
import { Button } from 'antd';
import { Post } from 'store/modules/post';

// Types
type FollowButtonProps = {
  post: Post;
};

function FollowButton({ post }: FollowButtonProps) {
  const { userData, follow, followLoading, unFollow } = useUser();
  // 사용자의 팔로잉에서 해당 게시글 작성자의 id와 일치하는것이 있는지 판단합니다. (게시글 작성자 팔로잉 유무)
  const isFollowing =
    userData && userData.Followings.find(value => value.id === post.User.id);

  const onFollow = useCallback(() => {
    const ids = { postId: post.id, postUserId: post.User.id };
    if (isFollowing) {
      unFollow(ids);
    } else {
      follow(ids);
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading === post.id} onClick={onFollow}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
}
export default FollowButton;
