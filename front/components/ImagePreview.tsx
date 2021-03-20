import React, { useCallback } from 'react';
import usePost from 'store/modules/postHook';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import { DeleteOutlined } from '@ant-design/icons';

// styled components
const StyledImagePreview = styled.div`
  padding: 15px 0;
  display: flex;
  flex-wrap: wrap;
`;

const PreviewImage = styled.div`
  position: relative;
  padding: 5px;
  > img {
    width: 80px;
    display: block;
    border: 1px solid #ddd;
  }
  > button {
    position: absolute;
    top: 5px;
    right: 5px;
    display: none;
  }
  :hover > button {
    display: block;
  }
`;

function ImagePreview({ imageInputRef }: any) {
  const { imagePaths, removePostImage } = usePost();
  const onRemoveImage = useCallback((index: number) => {
    removePostImage(index);
    imageInputRef.current.value = '';
  }, []);

  return (
    <StyledImagePreview>
      {imagePaths.map((path: string, index: number) => (
        <PreviewImage key={path}>
          <img src={path} alt="미리보기 사진" />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onRemoveImage(index)}
          />
        </PreviewImage>
      ))}
    </StyledImagePreview>
  );
}

export default ImagePreview;
