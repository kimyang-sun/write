import Head from 'next/head';
import React from 'react';
import PageTitle from 'components/PageTitle';
import SignUpForm from 'components/SignupForm';

// export
function SignUp() {
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
