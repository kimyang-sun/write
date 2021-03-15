import React, { useCallback } from 'react';
import usePost from 'store/modules/postHook';
import styled from 'styled-components';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

// styled components
const StyledImagePaths = styled.div`
  padding: 15px 0;
`;

const PreviewImage = styled.div`
  > img {
    width: 100px;
  }
`;

function ImagePaths() {
  const { imagePaths, removePostImage } = usePost();
  const onRemoveImage = useCallback((index: number) => {
    removePostImage(index);
  }, []);

  return (
    <StyledImagePaths>
      {imagePaths.map((path: string, index: number) => (
        <PreviewImage key={path}>
          <img src={`http://localhost:3006/${path}`} alt="미리보기 사진" />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onRemoveImage(index)}
          />
        </PreviewImage>
      ))}
    </StyledImagePaths>
  );
}

export default ImagePaths;
