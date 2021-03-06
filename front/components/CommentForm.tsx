import React, { useEffect } from 'react';
import usePost from 'store/modules/postHook';
import useUser from 'store/modules/userHook';
import { Controller, useForm } from 'react-hook-form';
import { Post } from 'store/modules/post';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
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

const NotLoggedInText = styled.p`
  text-align: center;
  padding: 15px 0;
`;

// export
function CommentForm({ post }: CommentFormProps) {
  const { userData } = useUser();
  const userId = userData && userData.id;
  const { addCommentDone, addComment } = usePost();
  const { handleSubmit, control, reset } = useForm<CommentFormType>();
  const onSubmit = handleSubmit((data: CommentFormType) => {
    addComment({
      postId: post.id,
      content: data.commentText,
    });
  });

  // 댓글 작성완료시 초기화
  useEffect(() => {
    if (addCommentDone) {
      reset({ commentText: '' });
    }
  }, [addCommentDone, reset]);

  return (
    <>
      {userId ? (
        <StyledCommentForm onFinish={onSubmit}>
          <Form.Item>
            <Controller
              as={<Input.TextArea />}
              name="commentText"
              control={control}
              placeholder="댓글을 작성하세요."
              defaultValue=""
            />
            <Button htmlType="submit">댓글작성</Button>
          </Form.Item>
        </StyledCommentForm>
      ) : (
        <NotLoggedInText>
          로그인을 하시면 댓글을 작성하실 수 있습니다. 😫
        </NotLoggedInText>
      )}
    </>
  );
}

export default React.memo(CommentForm);
