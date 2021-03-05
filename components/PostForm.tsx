import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ImagePaths from './ImagePaths';
import CloseButton from './CloseButton';
import Dialog from './Dialog';
import usePost from 'store/modules/postHook';

// Types
type PostFormProps = {
  setPostCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

type PostFormType = {
  text: string;
  image: any;
  tag: string;
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
    margin-bottom: 10px;
    min-height: 200px;
  }

  button[type='submit'] {
    margin-top: 15px;
  }
`;

const PostFormTitle = styled.div`
  position: relative;
  text-align: center;
  padding: 10px 0;
  .anticon-close-circle {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

// export
function PostForm({ setPostCreating }: PostFormProps) {
  const { addPost, addPostDone } = usePost();
  const imageInputRef = useRef<HTMLInputElement>(null);
  // React Hook Form 연동
  const { handleSubmit, control, register, reset } = useForm<PostFormType>();
  const onSubmit = handleSubmit((data: PostFormType) => {
    console.log(data);
    addPost(data);
  });

  // addPostDone 게시글 작성이 완료되면 초기화 해줍니다.
  // 그냥 onSubmit에서 하게되면 만약 서버에 문제가 있거나 하면 작동이 안됐는데 초기화될수가 있습니다.
  useEffect(() => {
    if (addPostDone) {
      reset({
        text: '',
        image: null,
        tag: '',
      });
      setPostCreating(false);
    }
  }, [addPostDone, reset, setPostCreating]);

  const onClose = useCallback(() => {
    setPostCreating(false);
  }, [setPostCreating]);

  const onClickImageUpload = useCallback(() => {
    imageInputRef.current && imageInputRef.current.click();
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
        <input
          type="file"
          name="image"
          ref={e => {
            register(e);
            imageInputRef.current = e;
          }}
          accept="image/*"
          multiple
          hidden
        />
        <Button onClick={onClickImageUpload}>사진 업로드</Button>
        <ImagePaths />
        <Controller
          as={<Input />}
          type="text"
          name="tag"
          control={control}
          placeholder="해시태그 추가 ex) #쓰다 #마음"
          defaultValue=""
        />
        <Button htmlType="submit" size="large" block>
          게시하기
        </Button>
      </StyledPostForm>
    </Dialog>
  );
}

export default PostForm;
