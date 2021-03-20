import React, { useCallback, useEffect, useState } from 'react';
import usePost from 'store/modules/postHook';
import Dialog from './Dialog';
import CloseButton from './CloseButton';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

// Types
type PostEditType = {
  id: number;
  content: string;
  setPostEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

// styled components
const PostEditBox = styled.div`
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

function PostEdit({ id, content, setPostEdit }: PostEditType) {
  const { updatePost, updatePostLoading, updatePostDone } = usePost();
  const [editText, setEditText] = useState(content);
  const onClose = useCallback(() => {
    setPostEdit(false);
  }, []);

  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditText(e.target.value);
    },
    []
  );

  const onChangePost = useCallback(() => {
    if (!editText || !editText.trim()) {
      return alert('글의 내용을 입력해주세요. (공백 불가능)');
    }
    updatePost({ postId: id, content: editText });
  }, [id, content, editText]);

  useEffect(() => {
    if (updatePostDone) setPostEdit(false);
  }, [updatePostDone]);

  return (
    <Dialog onClose={onClose}>
      <PostEditBox onClick={e => e.stopPropagation()}>
        <PostFormTitle>
          글 수정하기
          <CloseButton onClose={onClose} />
        </PostFormTitle>
        <Input.TextArea value={editText} onChange={onChangeText} />
        <Button
          onClick={onChangePost}
          loading={updatePostLoading}
          size="large"
          block
        >
          수정하기
        </Button>
      </PostEditBox>
    </Dialog>
  );
}

export default PostEdit;
