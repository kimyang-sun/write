import React, { useEffect } from 'react';
import { END } from 'redux-saga';
import AppLayout from 'components/AppLayout';
import wrapper, { SagaStore } from 'store/configureStore';
import usePost from 'store/modules/postHook';
import { useRouter } from 'next/router';
import axios from 'axios';
import { loadHashtagPostsRequest, Post } from 'store/modules/post';
import { loadMyInfoRequest } from 'store/modules/user';
import PostCard from 'components/PostCard';
import PageTitle from 'components/PageTitle';

function User() {
  const router = useRouter();
  const { tag } = router.query;
  const {
    mainPosts,
    loadHashtagPosts,
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
          loadHashtagPosts({ data: tag, lastId: lastId });
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
      <>
        <PageTitle title={`해시태그 #${tag} 검색`} />
        {mainPosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </>
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadHashtagPostsRequest({ data: context.params.tag }));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
});

export default User;
