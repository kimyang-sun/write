import Head from 'next/head';
import React, { useEffect } from 'react';
import PageTitle from 'components/PageTitle';
import SignUpForm from 'components/SignUpForm';
import useUser from 'store/modules/userHook';
import Router from 'next/router';
import { END } from '@redux-saga/core';
import { loadMyInfoRequest } from 'store/modules/user';
import wrapper, { SagaStore } from 'store/configureStore';
import axios from 'axios';
import AppLayout from 'components/AppLayout';

// export
function SignUp() {
  const { userData } = useUser();
  useEffect(() => {
    if (userData && userData.id) {
      Router.replace('/');
    }
  }, [userData && userData.id]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="회원가입" />
      <SignUpForm />
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

export default SignUp;
