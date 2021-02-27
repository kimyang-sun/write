import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';

import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ImagePaths from './ImagePaths';
import CloseButton from './CloseButton';

// Types
type PostFormProps = {
  setPostCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

type PostFormType = {
  text: string;
};

// styled components
const PostFormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledPostForm = styled(Form)`
  font-size: 1rem;
  width: 460px;
  background-color: #fff;
  background: #ffffff;
  box-shadow: 0 10px 30px #eeeeee;
  padding: 20px;
  textarea,
  .ant-btn-block {
    font-size: 1rem;
  }
  textarea {
    resize: none;
    min-height: 200px;
  }
  @media (max-width: 460px) {
    width: 100%;
  }
`;

const PostFormTitle = styled.div`
  position: relative;
  text-align: center;
  padding: 10px 0;
  .anticon-close-circle {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;

// export
function PostForm({ setPostCreating }: PostFormProps) {
  // React Hook Form 연동
  const { handleSubmit, control } = useForm<PostFormType>();
  const onSubmit = handleSubmit((data: PostFormType) => {
    console.log(data);
  });
  const onClose = useCallback(() => {
    setPostCreating(false);
  }, []);

  return (
    <PostFormContainer onClick={onClose}>
      <StyledPostForm
        encType="multipart/form-data"
        onFinish={onSubmit}
        onClick={e => e.stopPropagation()}
      >
        <PostFormTitle>
          글 작성하기
          <CloseButton onClose={onClose} />
        </PostFormTitle>
        <Controller
          as={<Input.TextArea />}
          name="text"
          control={control}
          maxLength={140}
          placeholder="당신의 마음을 적어보세요."
          defaultValue=""
        />
        <input type="file" multiple hidden />
        <ImagePaths />
        <Button htmlType="submit" block>
          게시하기
        </Button>
      </StyledPostForm>
    </PostFormContainer>
  );
}

export default PostForm;
