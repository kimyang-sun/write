import React from 'react';
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
  const { imagePaths } = usePost();
  return (
    <StyledImagePaths>
      {imagePaths.map((path: string) => (
        <PreviewImage key={path}>
          <img src={path} alt="미리보기 사진" />
          <Button icon={<DeleteOutlined />} />
        </PreviewImage>
      ))}
    </StyledImagePaths>
  );
}

export default ImagePaths;
