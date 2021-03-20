import React, { useEffect } from 'react';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from 'lib/yup';
import FormErrorMessage from 'components/FormErrorMessage';
import Router from 'next/router';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

// Types
type SignUpFormType = {
  email: string;
  nickname: string;
  password: string;
  password2: string;
  term: boolean;
};

// styled components
const StyledSignUpForm = styled(Form)`
  > div:not(:first-child) {
    margin-top: 30px; // ID 인풋박스만 제외하고
  }

  > div:not(:last-child) {
    position: relative; // 버튼 박스만 제외하고
  }

  > div > label {
    display: inline-block;
    padding-bottom: 8px;
  }
`;

// export
function SignUpForm() {
  const { signUp, signUpLoading, signUpDone, signUpError } = useUser();
  const { handleSubmit, errors, control } = useForm<SignUpFormType>({
    resolver: yupResolver(signUpValidation),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data: SignUpFormType) => {
    signUp({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
  });

  // 회원가입 완료
  useEffect(() => {
    if (signUpDone) {
      alert('회원가입이 완료되었습니다.');
      Router.replace('/');
    }
  }, [signUpDone]);

  // 회원가입 에러
  useEffect(() => {
    if (signUpError) alert(signUpError);
  }, [signUpError]);

  return (
    <StyledSignUpForm onFinish={onSubmit} size="large">
      <div>
        <label htmlFor="email">이메일</label>
        <Controller
          as={<Input />}
          type="text"
          name="email"
          control={control}
          placeholder="이메일을 입력해주세요."
          defaultValue=""
        />
        {errors.email && (
          <FormErrorMessage errorMessage={errors.email.message} />
        )}
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <Controller
          as={<Input />}
          type="text"
          name="nickname"
          control={control}
          placeholder="닉네임을 입력해주세요."
          defaultValue=""
        />
        {errors.nickname && (
          <FormErrorMessage errorMessage={errors.nickname.message} />
        )}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <Controller
          as={<Input />}
          type="password"
          name="password"
          control={control}
          placeholder="비밀번호를 입력해주세요."
          defaultValue=""
        />
        {errors.password && (
          <FormErrorMessage errorMessage={errors.password.message} />
        )}
      </div>
      <div>
        <label htmlFor="password2">비밀번호 확인</label>
        <Controller
          as={<Input />}
          type="password"
          name="password2"
          control={control}
          placeholder="비밀번호를 확인해주세요."
          defaultValue=""
        />
        {errors.password2 && (
          <FormErrorMessage errorMessage={errors.password2.message} />
        )}
      </div>
      <div>
        <Controller
          name="term"
          control={control}
          defaultValue={false}
          render={({ onChange, value }) => (
            <Checkbox
              onChange={e => onChange(e.target.checked)}
              checked={value}
            >
              약관에 동의합니다.
            </Checkbox>
          )}
        />
        {errors.term && <FormErrorMessage errorMessage={errors.term.message} />}
      </div>
      <div>
        <Button loading={signUpLoading} type="primary" htmlType="submit" block>
          가입하기
        </Button>
      </div>
    </StyledSignUpForm>
  );
}

export default SignUpForm;
