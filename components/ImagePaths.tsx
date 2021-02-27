import React from 'react';
import usePost from 'store/modules/postHook';
import styled from 'styled-components';
import { Button } from 'antd';

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
      <Button>사진 업로드</Button>
      {imagePaths.map((path: string) => (
        <PreviewImage key={path}>
          <img src={path} alt="미리보기 사진" />
        </PreviewImage>
      ))}
    </StyledImagePaths>
  );
}

export default ImagePaths;
