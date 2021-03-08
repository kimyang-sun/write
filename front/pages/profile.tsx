import ProfileEditForm from 'components/ProfileEditForm';
import FollowList from 'components/FollowList';
import Head from 'next/head';
import React, { useEffect } from 'react';
import PageTitle from 'components/PageTitle';
import styled from 'styled-components';
import useUser from 'store/modules/userHook';
import Router from 'next/router';

// Types

// styled components
const FollowListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Profile() {
  const { userData } = useUser();
  useEffect(() => {
    if (!(userData && userData.id)) {
      Router.push('/');
    }
  }, [userData && userData.id]);

  return (
    <>
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
    </>
  );
}

export default Profile;
