import { Button, Form, Input } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Post } from 'store/modules/post';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';

// Types
type CommentFormProps = {
  postId: number;
};

type CommentFormType = {
  commentText: string;
};

// styled components
const StyledCommentForm = styled(Form)`
  text-align: right;
  textarea {
    resize: none;
    padding: 8px 12px;
    margin-bottom: 10px;
    min-height: 52px;
  }
`;

// export
function CommentForm({ postId }: CommentFormProps) {
  const { userData } = useUser();
  const userId = userData && userData.userId;
  const { handleSubmit, control } = useForm<CommentFormType>();
  const onSubmit = handleSubmit((data: CommentFormType) => {
    console.log(data, postId, userId);
  });

  return (
    <StyledCommentForm onFinish={onSubmit}>
      <Form.Item>
        <Controller
          as={<Input.TextArea />}
          name="commentText"
          control={control}
        />

        <Button htmlType="submit">댓글작성</Button>
      </Form.Item>
    </StyledCommentForm>
  );
}

export default CommentForm;
