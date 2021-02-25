import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from 'src/yup';
import FormErrorMessage from './FormErrorMessage';
import { loginActionType } from 'store/modules/user';

// Types
type LoginFormProps = {
  login: (data: loginActionType) => void;
};

type LoginInputType = {
  userId: string;
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
function LoginForm({ login }: LoginFormProps) {
  const { handleSubmit, errors, control } = useForm<LoginInputType>({
    resolver: yupResolver(loginValidation),
  });
  const onSubmit = handleSubmit((data: LoginInputType) => {
    login(data);
  });

  return (
    <StyledLoginForm onFinish={onSubmit} size="large">
      <div>
        <label htmlFor="userId">아이디</label>
        <Controller
          as={<Input />}
          type="text"
          name="userId"
          control={control}
          placeholder="아이디를 입력해주세요."
          defaultValue=""
        />
        {errors.userId && (
          <FormErrorMessage
            errorMessage={errors.userId.message}
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
        <Button type="primary" htmlType="submit" block>
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
