import {
  HeartOutlined,
  RetweetOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { Avatar, Button, Card, Popover, List, Comment } from 'antd';
import React, { useState } from 'react';
import { CommentType, Post } from 'store/modules/post';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import PostImages from './PostImages';

// Types
type PostCardProps = {
  post: Post;
};

// styled components
const StyledPostCard = styled.div`
  margin-top: 20px;
`;

function PostCard({ post }: PostCardProps) {
  const { userData } = useUser();
  const userId = userData && userData.id;
  const [liked, setLiked] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);
  const onToggleLike = () => {
    setLiked(!liked);
  };
  const onToggleComment = () => {
    setCommentOpened(commentOpened => !commentOpened);
  };

  return (
    <StyledPostCard>
      <Card
        cover={
          post.Images && (
            <PostImages images={post.Images} content={post.content} />
          )
        }
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
        <Card.Meta avatar={<Avatar>선양</Avatar>} title={post.User.nickname} />
      </Card>
      {commentOpened && (
        <div>
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item: CommentType) => (
              <List.Item>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>선양</Avatar>}
                  content={item.content}
                />
              </List.Item>
            )}
          />
          <CommentForm postId={post.id} />
        </div>
      )}
    </StyledPostCard>
  );
}

export default PostCard;
