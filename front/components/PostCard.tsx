import React, { useCallback, useEffect, useState } from 'react';
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
  LikeOutlined,
  LikeTwoTone,
  RetweetOutlined,
  MessageOutlined,
  EllipsisOutlined,
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
  .ant-card-actions .count {
    padding-right: 10px;
  }
  .ant-card-actions .count + span {
    width: auto;
  }
  .anticon {
    font-size: 1rem;
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
  const userId = userData && userData.id; // 유저 아이디
  const liked = post.Likers.find(liker => liker.id === userId); // 좋아요 버튼
  const {
    removePost,
    removePostLoading,
    likePost,
    unLikePost,
    scrapPost,
  } = usePost();
  const [commentOpened, setCommentOpened] = useState(false);

  const onRemovePost = useCallback(() => {
    if (!userId) return alert('로그인이 되어있지 않습니다.');
    removePost(post.id);
  }, [userId]);

  const onScrap = useCallback(() => {
    if (!userId) return alert('로그인이 되어있지 않습니다.');
    scrapPost(post.id);
  }, [userId]);

  const onLike = useCallback(() => {
    if (!userId) return alert('로그인이 되어있지 않습니다.');
    likePost(post.id);
  }, [userId]);

  const onUnLike = useCallback(() => {
    if (!userId) return alert('로그인이 되어있지 않습니다.');
    unLikePost(post.id);
  }, [userId]);

  const onToggleComment = useCallback(() => {
    setCommentOpened(commentOpened => !commentOpened);
  }, [userId]);

  return (
    <StyledPostCard>
      <Card
        cover={
          post.Images &&
          !post.ScrapId && (
            <PostImages images={post.Images} content={post.content} />
          )
        }
        actions={[
          <Popover content="스크랩">
            <RetweetOutlined key="scrap" onClick={onScrap} />
          </Popover>,
          <div onClick={onLike}>
            <span className="count">{post.Likers.length}</span>
            {liked ? (
              <LikeTwoTone
                key="like"
                twoToneColor="#6136ff"
                onClick={onUnLike}
              />
            ) : (
              <LikeOutlined key="like" />
            )}
          </div>,
          <div onClick={onToggleComment}>
            <span className="count">{post.Comments.length}</span>
            <MessageOutlined key="comments" />
          </div>,
          <Popover
            key="more"
            trigger="click"
            content={
              <Button.Group>
                {userId && userId === post.User.id ? (
                  <>
                    <Button block>수정</Button>
                    <Button
                      onClick={onRemovePost}
                      loading={removePostLoading}
                      danger
                      block
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
        extra={post.ScrapId ? `${post.User.nickname}님이 스크랩한 글` : null}
      >
        {post.ScrapId && post.Scrap ? (
          <Card
            cover={
              post.Images && (
                <PostImages
                  images={post.Scrap.Images}
                  content={post.Scrap.content}
                />
              )
            }
          >
            <Card.Meta
              avatar={
                post.User.avatar ? (
                  <Avatar
                    src={`http://localhost:3006/${post.Scrap.User.avatar}`}
                  />
                ) : (
                  <Avatar>{post.Scrap.User.nickname.charAt(0)}</Avatar>
                )
              }
              title={post.Scrap.User.nickname}
              description={
                <>
                  {post.Scrap.tag && <PostHashtag hashtag={post.Scrap.tag} />}
                  <span className="post-date">
                    {post.Scrap.createdAt.slice(0, 10)}
                  </span>
                </>
              }
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              post.User.avatar ? (
                <Avatar src={`http://localhost:3006/${post.User.avatar}`} />
              ) : (
                <Avatar>{post.User.nickname.charAt(0)}</Avatar>
              )
            }
            title={
              <>
                {post.User.nickname}
                {userId && userId !== post.User.id && (
                  <FollowButton post={post} />
                )}
              </>
            }
            description={
              <>
                {post.tag && <PostHashtag hashtag={post.tag} />}
                <span className="post-date">{post.createdAt.slice(0, 10)}</span>
              </>
            }
          />
        )}
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
                  avatar={
                    item.User.avatar ? (
                      <Avatar
                        src={`http://localhost:3006/${item.User.avatar}`}
                      />
                    ) : (
                      <Avatar>{item.User.nickname.charAt(0)}</Avatar>
                    )
                  }
                  content={item.content}
                  datetime={item.createdAt.slice(0, 10)}
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
