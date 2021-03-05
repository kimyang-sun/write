import ProfileEditForm from 'components/ProfileEditForm';
import FollowList from 'components/FollowList';
import Head from 'next/head';
import React from 'react';
import PageTitle from 'components/PageTitle';
import styled from 'styled-components';
import useUser from 'store/modules/userHook';

// Types

// styled components
const FollowListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Profile() {
  const { userData } = useUser();
  return (
    <>
      <Head>
        <title>프로필 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="프로필" />
      <ProfileEditForm />
      <FollowListContainer>
        <FollowList header="팔로워 목록" data={userData.Followers} />
        <FollowList header="팔로잉 목록" data={userData.Followings} />
      </FollowListContainer>
    </>
  );
}

export default Profile;
