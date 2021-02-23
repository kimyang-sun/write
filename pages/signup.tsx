import AppLayout from 'components/AppLayout';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import PageTitle from 'components/PageTitle';

// Types

// styled components
const StyledSignup = styled.div``;

const SignupForm = styled(Form)``;

// export
function Signup() {
  return (
    <>
      <Head>
        <title>회원가입 | &quot;쓰다&quot;</title>
      </Head>
      <PageTitle title="회원가입" />
      <StyledSignup></StyledSignup>
    </>
  );
}

export default Signup;
