import {
  HeartOutlined,
  RetweetOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { Avatar, Button, Card, Popover } from 'antd';
import React, { useState } from 'react';
import { Post } from 'store/modules/post';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import Comments from './Comments';
import PostImages from './PostImages';

// Types
type PostCardProps = {
  post: Post;
};

// styled components
const StyledPostCard = styled.div``;

function PostCard({ post }: PostCardProps) {
  const { userData } = useUser();
  const userId = userData && userData.id;
  const [liked, setLiked] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);
  const onToggleLike = () => {
    setLiked(!liked);
  };
  const onToggleComment = () => {
    setCommentOpened(!commentOpened);
  };

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="share" />,
          liked ? (
            <HeartTwoTone
              key="heart"
              twoToneColor="#eb2f96"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comments" onClick={onToggleComment} />,
          <Popover
            key="more"
            trigger="click"
            content={
              <Button.Group>
                {userId && userId === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button danger>삭제</Button>
                  </>
                ) : (
                  <Button danger>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined key="more" />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>선양</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
        <Button></Button>
      </Card>
      {commentOpened && <CommentForm />}

      <Comments />
    </div>
  );
}

export default PostCard;
