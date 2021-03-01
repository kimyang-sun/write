import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PostContent from './PostContent';

// Types
type PostImagesProps = {
  images: { src: string }[];
  content: string;
};

type PostBackgroundProps = {
  imageUrl: string;
};

// styled components
const StyledPostImages = styled.div`
  position: relative;
  > button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 100;
  }
`;

const PostBackground = styled.div<PostBackgroundProps>`
  background-image: url('${props => props.imageUrl}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: relative;
  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const ViewMoreArea = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 100;
  color: #f8f8f8;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  transition: color 0.3s;
  :hover {
    color: #ccc;
  }
`;

// export
function PostImages({ images, content }: PostImagesProps) {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [contentOpened, setContentOpened] = useState(true);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);
  const onContentOpen = useCallback(() => {
    setContentOpened(contentOpened => !contentOpened);
  }, []);

  if (images.length === 1) {
    return (
      <StyledPostImages>
        <Button
          shape="circle"
          icon={contentOpened ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          onClick={onContentOpen}
        ></Button>
        {contentOpened && <PostContent content={content} />}
        <PostBackground
          imageUrl={images[0].src}
          role="presentation"
          onClick={onZoom}
        ></PostBackground>
      </StyledPostImages>
    );
  }

  if (images.length > 1) {
    return (
      <StyledPostImages>
        <Button
          shape="circle"
          icon={contentOpened ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          onClick={onContentOpen}
        ></Button>
        {contentOpened && <PostContent content={content} />}
        <PostBackground
          imageUrl={images[0].src}
          role="presentation"
          onClick={onZoom}
        ></PostBackground>
        <ViewMoreArea>{images.length - 1} 개의 사진 더보기</ViewMoreArea>
      </StyledPostImages>
    );
  }
  return;
}

export default PostImages;
