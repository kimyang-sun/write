import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import wrapper, { SagaStore } from 'store/configureStore';
import { loadMyInfoRequest } from 'store/modules/user';
import axios from 'axios';
import { loadPostRequest } from 'store/modules/post';
import AppLayout from 'components/AppLayout';
import PostCard from 'components/PostCard';
import usePost from 'store/modules/postHook';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = usePost();
  return (
    <AppLayout>
      {singlePost && (
        <Head>
          <title>"쓰다" -{singlePost.User.nickname}님의 글</title>
          <meta name="description" content={singlePost.content} />
          <meta
            property="og:title"
            content={`${singlePost.User.nickname}님의 게시글`}
          />
          <meta property="og:description" content={singlePost.content} />
          <meta
            property="og:image"
            content={
              singlePost.Images[0]
                ? singlePost.Images[0].src
                : 'https://write.com/images/logo.png'
            }
          />
          <meta property="og:url" content={`https://write.com/post/${id}`} />
        </Head>
      )}
      <PostCard post={singlePost} />
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
  context.store.dispatch(loadPostRequest(context.params.id)); // params, query 값을 넣어줄 수 있습니다.
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
});

export default Post;
