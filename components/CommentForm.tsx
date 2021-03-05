import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Post } from 'store/modules/post';
import usePost from 'store/modules/postHook';
import useUser from 'store/modules/userHook';
import styled from 'styled-components';

// Types
type CommentFormProps = {
  post: Post;
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
function CommentForm({ post }: CommentFormProps) {
  const { userData } = useUser();
  const userId = userData && userData.id;
  const { addCommentDone } = usePost();
  const { handleSubmit, control, reset } = useForm<CommentFormType>();
  const onSubmit = handleSubmit((data: CommentFormType) => {
    console.log(data, post.postId, userId);
  });

  // 댓글 작성완료시 초기화
  useEffect(() => {
    if (addCommentDone) {
      reset({ commentText: '' });
    }
  }, [addCommentDone, reset]);

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
