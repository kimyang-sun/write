import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from 'service/yup';
import FormErrorMessage from './FormErrorMessage';
import { LoginRequestPayload } from 'store/modules/user';

// Types
type LoginFormProps = {
  loading: boolean;
  login: (data: LoginRequestPayload) => void;
};

type LoginFormType = {
  userEmail: string;
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
`;

// export
function LoginForm({ loading, login }: LoginFormProps) {
  const { handleSubmit, errors, control } = useForm<LoginFormType>({
    resolver: yupResolver(loginValidation),
    mode: 'onBlur',
  });
  const onSubmit = handleSubmit((data: LoginFormType) => {
    login(data);
  });

  return (
    <StyledLoginForm onFinish={onSubmit} size="large">
      <div>
        <label htmlFor="userEmail">이메일</label>
        <Controller
          as={<Input />}
          type="text"
          name="userEmail"
          control={control}
          placeholder="이메일을 입력해주세요."
          defaultValue=""
        />
        {errors.userEmail && (
          <FormErrorMessage
            errorMessage={errors.userEmail.message}
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
