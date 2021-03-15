import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import PostImage from './PostImage';
import CloseButton from './CloseButton';

// Types
type ImageSliderProps = {
  images: { src: string }[];
  content: string;
  contentOpened: boolean;
  onContentToggle: () => void;
  onClose: () => void;
};

// styled components
const ImageSliderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 680px;
    position: relative;
    text-align: center;
  }
  .anticon-close-circle {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.875rem;
    background-color: #fff;
    border-radius: 50%;
    z-index: 100;
  }

  @media (max-width: ${props => props.theme.mediaSize.medium}) {
    > div {
      width: 100%;
    }
  }
`;

const PageIndicator = styled.div`
  display: inline-block;
  color: #fff;
  background-color: #383838;
  padding: 5px 20px;
  margin-top: 10px;
  border-radius: 15px;
`;

// export
function ImageSlider({ images, onClose }: ImageSliderProps) {
  // 페이지 표시
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <ImageSliderContainer>
      <div>
        <CloseButton onClose={onClose} />
        <Slider beforeChange={(_prev, next) => setCurrentSlide(next)}>
          {images.map((img: { src: string }) => (
            <div key={img.src}>
              <PostImage imageUrl={`http://localhost:3006/${img.src}`} />
            </div>
          ))}
        </Slider>
        <PageIndicator>
          {currentSlide + 1} / {images.length}
        </PageIndicator>
      </div>
    </ImageSliderContainer>
  );
}

export default ImageSlider;
