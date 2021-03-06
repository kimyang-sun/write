import React, { useEffect } from 'react';
import useUser from 'store/modules/userHook';
import FollowList from 'components/FollowList';
import Head from 'next/head';
import PageTitle from 'components/PageTitle';
import styled from 'styled-components';
import Router from 'next/router';
import { END } from 'redux-saga';
import wrapper, { SagaStore } from 'store/configureStore';
import { loadMyInfoRequest } from 'store/modules/user';
import axios from 'axios';
import AppLayout from 'components/AppLayout';
import useSWR from 'swr';
import usePost from 'store/modules/postHook';
import PostCard from 'components/PostCard';
import { loadRelatedPostsRequest, Post } from 'store/modules/post';

// styled components
const FollowListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

// SWR Fetcher
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then(result => result.data);

const FOLLOWER_LIMIT = 4;

function Follow() {
  const { userData } = useUser();
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    loadRelatedPosts,
  } = usePost();
  useEffect(() => {
    if (!(userData && userData.id)) {
      Router.replace('/');
    }
  }, [userData && userData.id]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          loadRelatedPosts(lastId);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, mainPosts, loadPostsLoading]);

  // 팔로워, 팔로잉 목록 불러오기 (SWR)
  const {
    data: followerData,
    error: followerError,
    mutate: mutateFollower,
  } = useSWR(
    `http://localhost:3006/user/followers?limit=${FOLLOWER_LIMIT}`,
    fetcher
  );
  const {
    data: followingData,
    error: followingError,
    mutate: mutateFollowing,
  } = useSWR(
    `http://localhost:3006/user/followings?limit=${FOLLOWER_LIMIT}`,
    fetcher
  );
  if (followerError || followingError) {
    console.error(followerError || followingError);
    return null; // 리턴은 Hooks보다 위에 있으면 안됩니다.
  }
  return (
    <AppLayout>
      <Head>
        <title>팔로워 & 팔로잉 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="팔로워 & 팔로잉" />
      {userData ? (
        <>
          <FollowListContainer>
            <FollowList
              header="팔로워"
              data={followerData}
              mutate={mutateFollower}
            />
            <FollowList
              header="팔로잉"
              data={followingData}
              mutate={mutateFollowing}
            />
          </FollowListContainer>
          <h3>😊 팔로우한 사람의 글</h3>
          {mainPosts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px 0' }}>
              글이 존재하지 않습니다. 😑
            </p>
          ) : (
            mainPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </>
      ) : (
        <p>로그인이 필요합니다. 😥</p>
      )}
    </AppLayout>
  );
}

// 서버사이드 렌더링
export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadRelatedPostsRequest());
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
});

export default Follow;
