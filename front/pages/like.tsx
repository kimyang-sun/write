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
import usePost from 'store/modules/postHook';
import PostCard from 'components/PostCard';
import { loadLikedPostsRequest, Post } from 'store/modules/post';

function Follow() {
  const { userData } = useUser();
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    loadLikedPosts,
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
          loadLikedPosts(lastId);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, mainPosts, loadPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>내가 좋아하는 글 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="내가 좋아하는 글" />
      {userData ? (
        <>
          <h3>♥ 내가 좋아하는 글</h3>
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
  context.store.dispatch(loadLikedPostsRequest());
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
});

export default Follow;
