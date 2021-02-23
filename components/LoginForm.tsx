import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Types
type LoginFormProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoginInputType = {
  userId: string;
  password: string;
};

// styled components
const StyledLoginForm = styled(Form)`
  > div:not(:last-child) {
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

  .signup__btnBox {
    margin-top: 40px;
  }
`;

const SignupErrorMessage = styled.div`
  position: absolute;
  color: ${props => props.theme.color.main};
`;

// Yup으로 유효성 검사
const validationSchema = yup.object({
  userId: yup
    .string()
    .required('아이디를 입력해주세요.')
    .max(12, '아이디는 12자리 이하여야 합니다.')
    .min(4, '아이디는 4자리 이상이어야 합니다.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(4, '비밀번호는 4자리 이상이어야 합니다.'),
});

// 리턴 컴포넌트
function LoginForm({ setIsLoggedIn }: LoginFormProps) {
  const { handleSubmit, errors, control } = useForm<LoginInputType>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = handleSubmit((data: LoginInputType) => {
    console.log(data);
    setIsLoggedIn(true);
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
          <SignupErrorMessage>{errors.userId.message}</SignupErrorMessage>
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
          <SignupErrorMessage>{errors.password.message}</SignupErrorMessage>
        )}
      </div>
      <div className="signup__btnBox">
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
