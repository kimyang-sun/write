import ProfileEditForm from 'components/ProfileEditForm';
import FollowList from 'components/FollowList';
import Head from 'next/head';
import React from 'react';
import PageTitle from 'components/PageTitle';
import styled from 'styled-components';

function Profile() {
  const followerList = [
    { name: '류태연' },
    { name: '민병관' },
    { name: '박희진' },
    { name: '임서윤 & 임이슬' },
  ];

  const followingList = [
    { name: '류태연' },
    { name: '민병관' },
    { name: '박희진' },
    { name: '임서윤 & 임이슬' },
  ];

  const FollowListContainer = styled.div`
    display: flex;
  `;

  return (
    <>
      <Head>
        <title>프로필 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="프로필" />
      <ProfileEditForm />
      <FollowListContainer>
        <FollowList header="팔로워 목록" data={followerList} />
        <FollowList header="팔로잉 목록" data={followingList} />
      </FollowListContainer>
    </>
  );
}

export default Profile;
