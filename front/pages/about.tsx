import { END } from '@redux-saga/core';
import { Card } from 'antd';
import AppLayout from 'components/AppLayout';
import UserAvatar from 'components/UserAvatar';
import Head from 'next/head';
import React from 'react';
import wrapper, { SagaStore } from 'store/configureStore';
import { loadUserRequest } from 'store/modules/user';
import useUser from 'store/modules/userHook';

function About() {
  const { userInfo } = useUser();
  return (
    <AppLayout>
      <Head>
        <title>프로필 | &quot;쓰다&quot;</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="write">글 {userInfo.Posts.length}</div>,
            <div key="followers">팔로워 {userInfo.Followers.length}</div>,
            <div key="followings">팔로잉 {userInfo.Followings.length}</div>,
          ]}
        >
          <Card.Meta
            avatar={
              <UserAvatar
                avatar={userInfo.avatar}
                nickname={userInfo.nickname}
                sizeUp
              />
            }
            title={userInfo.nickname}
            description={userInfo.introduction}
          />
        </Card>
      ) : (
        '사용자 정보가 없습니다 😑'
      )}
    </AppLayout>
  );
}

// 서버사이드 렌더링
export const getStaticProps = wrapper.getStaticProps(async context => {
  context.store.dispatch(loadUserRequest(1));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
});

export default About;
