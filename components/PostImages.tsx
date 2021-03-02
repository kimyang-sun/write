import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';
import PostContent from './PostContent';
import PostImage from './PostImage';

// Types
type PostImagesProps = {
  images: { src: string }[];
  content: string;
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
  @media (max-width: ${props => props.theme.mediaSize.small}) {
    padding: 10px 15px;
  }
`;

// export
function PostImages({ images, content }: PostImagesProps) {
  const [showImageMore, setShowImageMore] = useState(false);
  const [contentOpened, setContentOpened] = useState(true);

  const onMore = useCallback(() => {
    setShowImageMore(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImageMore(false);
  }, []);

  // 글 내용 열고닫
  const onContentToggle = useCallback(() => {
    setContentOpened(contentOpened => !contentOpened);
  }, []);

  if (images.length === 1) {
    return (
      <StyledPostImages>
        <Button
          shape="circle"
          icon={contentOpened ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          onClick={onContentToggle}
        />
        {contentOpened && <PostContent content={content} />}
        <PostImage imageUrl={images[0].src} />
      </StyledPostImages>
    );
  }

  if (images.length > 1) {
    return (
      <>
        <StyledPostImages>
          <Button
            shape="circle"
            icon={contentOpened ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={onContentToggle}
          />
          {contentOpened && <PostContent content={content} />}
          <PostImage imageUrl={images[0].src} />
          <ViewMoreArea onClick={onMore}>
            {images.length - 1} 개의 사진 더보기
          </ViewMoreArea>
        </StyledPostImages>
        {showImageMore && (
          <ImageSlider
            images={images}
            content={content}
            contentOpened={contentOpened}
            onContentToggle={onContentToggle}
            onClose={onClose}
          />
        )}
      </>
    );
  }

  return;
}

export default PostImages;
