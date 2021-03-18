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
import useSWR from 'swr';
import { Button } from 'antd';
import Link from 'next/link';

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

function Profile() {
  const { userData } = useUser();
  useEffect(() => {
    if (!(userData && userData.id)) {
      // push와 다른점은 push는 이동시키고 뒤로가기를 누르면 다시 그페이지로 감
      // replace는 아예 기록도 없애서 뒤로가기가 남지않음.
      Router.replace('/');
    }
  }, [userData && userData.id]);
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
        <title>프로필 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="프로필" />
      {userData ? (
        <>
          <ProfileEditForm />
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
          <Button size="large" block>
            <Link href={`/user/${userData.id}`}>
              <a>내 글 보러가기</a>
            </Link>
          </Button>
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
