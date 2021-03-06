import Link from 'next/link';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from 'lib/yup';
import FormErrorMessage from './FormErrorMessage';
import { LoginRequestPayload } from 'store/modules/user';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

// Types
type LoginFormProps = {
  loading: boolean;
  login: (data: LoginRequestPayload) => void;
  loginError: string;
};

type LoginFormType = {
  email: string;
  password: string;
};

// styled components
const StyledLoginForm = styled(Form)`
  > div:not(:last-child) {
    // 버튼박스만 제외하고
    margin-top: 30px;
    position: relative;
  }
  > div > label {
    display: inline-block;
    padding-bottom: 8px;
  }
  .ant-btn-primary {
    margin-bottom: 8px;
  }
  .login__btnBox {
    margin-top: 40px;
  }
  @media (min-width: ${props => props.theme.mediaSize.xlarge}) {
    position: sticky;
    top: 10px;
  }
  @media (max-width: ${props => props.theme.mediaSize.xlarge}) {
    margin-bottom: 30px;
  }
`;

// export
function LoginForm({ loading, login, loginError }: LoginFormProps) {
  const { handleSubmit, errors, control } = useForm<LoginFormType>({
    resolver: yupResolver(loginValidation),
    mode: 'onBlur',
  });
  const onSubmit = handleSubmit((data: LoginFormType) => {
    login(data);
  });

  // 로그인 에러
  useEffect(() => {
    if (loginError) alert(loginError);
  }, [loginError]);

  return (
    <StyledLoginForm onFinish={onSubmit} size="large">
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
          <FormErrorMessage
            errorMessage={errors.email.message}
          ></FormErrorMessage>
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
          <FormErrorMessage
            errorMessage={errors.password.message}
          ></FormErrorMessage>
        )}
      </div>
      <div className="login__btnBox">
        <Button type="primary" htmlType="submit" loading={loading} block>
          로그인
        </Button>
        <Button block>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Button>
      </div>
    </StyledLoginForm>
  );
}

export default LoginForm;
