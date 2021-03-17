import React, { useEffect } from 'react';
import useUser from 'store/modules/userHook';
import ProfileEditForm from 'components/ProfileEditForm';
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

// styled components
const FollowListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Profile() {
  const { userData, loadFollowers, loadFollwings } = useUser();
  useEffect(() => {
    if (!(userData && userData.id)) {
      // push와 다른점은 push는 이동시키고 뒤로가기를 누르면 다시 그페이지로 감
      // replace는 아예 기록도 없애서 뒤로가기가 남지않음.
      Router.replace('/');
    }
  }, [userData && userData.id]);

  // 팔로워 팔로잉 목록 불러오기
  useEffect(() => {
    loadFollowers();
    loadFollwings();
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>프로필 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="프로필" />
      {userData ? (
        <>
          <ProfileEditForm />
          <FollowListContainer>
            <FollowList header="팔로워 목록" data={userData.Followers} />
            <FollowList header="팔로잉 목록" data={userData.Followings} />
          </FollowListContainer>
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
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();
});

export default Profile;
