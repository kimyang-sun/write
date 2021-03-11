import React, { useState } from 'react';
import usePost from 'store/modules/postHook';
import useUser from 'store/modules/userHook';
import { PostComment, Post } from 'store/modules/post';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostHashtag from './PostHashtag';
import PostImages from './PostImages';
import { Avatar, Button, Card, Popover, List, Comment } from 'antd';
import {
  HeartOutlined,
  RetweetOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';

// Types
type PostCardProps = {
  post: Post;
};

// styled components
const StyledPostCard = styled.div`
  margin-top: 24px;
  .ant-card-body {
    position: relative;
    padding: 20px;
  }
  .ant-card-meta-avatar {
    padding-right: 10px;
  }
  .post-date {
    font-size: 0.813rem;
    position: absolute;
    top: 20px;
    right: 15px;
  }

  @media (max-width: ${props => props.theme.mediaSize.small}) {
    .ant-card-body {
      font-size: 0.813rem;
      padding-top: 35px;
    }
    .ant-card-meta-title {
      font-size: 0.875rem;
    }
    .post-date {
      top: 10px;
    }
  }
`;

function PostCard({ post }: PostCardProps) {
  const { userData } = useUser();
  const userId = userData && userData.id;
  const { removePost, removePostLoading } = usePost();
  const [liked, setLiked] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);
  const onRemovePost = (id: number) => {
    removePost({ postId: id });
  };
  const onToggleLike = () => {
    setLiked(liked => !liked);
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
          <RetweetOutlined key="scrap" />,
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
                    <Button
                      onClick={() => onRemovePost(post.id)}
                      loading={removePostLoading}
                      danger
                    >
                      삭제
                    </Button>
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
          avatar={<Avatar>{post.User.nickname.charAt(0)}</Avatar>}
          title={
            <>
              {post.User.nickname}
              {userId && <FollowButton post={post} />}
            </>
          }
          description={
            <>
              <PostHashtag hashtag={post.hashtag} />
              <span className="post-date">{post.date}</span>
            </>
          }
        ></Card.Meta>
      </Card>
      {commentOpened && (
        <div>
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item: PostComment) => (
              <List.Item>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname.charAt(0)}</Avatar>}
                  content={item.content}
                />
              </List.Item>
            )}
          />
          <CommentForm post={post} />
        </div>
      )}
    </StyledPostCard>
  );
}

export default PostCard;
