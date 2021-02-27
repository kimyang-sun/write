import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';

import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ImagePaths from './ImagePaths';
import CloseButton from './CloseButton';
import Dialog from './Dialog';

// Types
type PostFormProps = {
  setPostCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

type PostFormType = {
  text: string;
};

// styled components
const StyledPostForm = styled(Form)`
  textarea,
  .ant-btn-block {
    font-size: 1rem;
  }
  textarea {
    resize: none;
    padding: 8px 12px;
    min-height: 200px;
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
    <Dialog onClose={onClose}>
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
        <Button htmlType="submit" size="large" block>
          게시하기
        </Button>
      </StyledPostForm>
    </Dialog>
  );
}

export default PostForm;