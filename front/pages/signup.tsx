import Head from 'next/head';
import React, { useEffect } from 'react';
import PageTitle from 'components/PageTitle';
import SignUpForm from 'components/SignUpForm';
import useUser from 'store/modules/userHook';
import Router from 'next/router';

// export
function SignUp() {
  const { userData } = useUser();
  useEffect(() => {
    if (userData && userData.id) {
      Router.replace('/');
    }
  }, [userData && userData.id]);

  return (
    <>
      <Head>
        <title>회원가입 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="회원가입" />
      <SignUpForm />
    </>
  );
}

export default SignUp;
