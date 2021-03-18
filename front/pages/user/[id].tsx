import React, { useEffect } from 'react';
import { END } from 'redux-saga';
import { Card } from 'antd';
import AppLayout from 'components/AppLayout';
import UserAvatar from 'components/UserAvatar';
import Head from 'next/head';
import wrapper, { SagaStore } from 'store/configureStore';
import useUser from 'store/modules/userHook';
import usePost from 'store/modules/postHook';
import { useRouter } from 'next/router';
import axios from 'axios';
import { loadUserPostsRequest, Post } from 'store/modules/post';
import { loadMyInfoRequest, loadUserRequest } from 'store/modules/user';
import PostCard from 'components/PostCard';
import PageTitle from 'components/PageTitle';
import styled from 'styled-components';

const StyledDiv = styled.div`
  cursor: default;
  color: #aaa;
`;

function User() {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useUser();
  const {
    mainPosts,
    loadUserPosts,
    loadPostsLoading,
    hasMorePosts,
    scrapPostError,
  } = usePost();
  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          loadUserPosts({ data: id, lastId: lastId });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, mainPosts, loadPostsLoading]);

  useEffect(() => {
    if (scrapPostError) alert(scrapPostError);
  }, [scrapPostError]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>"쓰다" - {userInfo.nickname}님의 글</title>
          <meta name="description" content={`${userInfo.nickname}님의 글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 글`} />
          <meta
            property="og:description"
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property="og:image"
            content="https://write.com/images/logo.png"
          />
          <meta property="og:url" content={`https://write.com/user/${id}`} />
        </Head>
      )}
      {userInfo ? (
        <>
          <PageTitle title={`${userInfo.nickname}님의 글`} />
          <Card
            actions={[
              <StyledDiv key="write">글 {userInfo.Posts}</StyledDiv>,
              <StyledDiv key="followers">
                팔로워 {userInfo.Followers}
              </StyledDiv>,
              <StyledDiv key="followings">
                팔로잉 {userInfo.Followings}
              </StyledDiv>,
            ]}
          >
            <Card.Meta
              avatar={
                <UserAvatar
                  avatar={userInfo.avatar}
                  nickname={userInfo.nickname}
                  id={userInfo.id}
                  sizeUp
                />
              }
              title={userInfo.nickname}
              description={userInfo.introduction}
            />
          </Card>
        </>
      ) : (
        '사용자 정보가 없습니다 😑'
      )}
      {mainPosts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

// 서버 사이드 렌더링
export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadUserRequest(context.params.id));
  context.store.dispatch(loadUserPostsRequest({ data: context.params.id }));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
});

export default User;
