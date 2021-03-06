import React from 'react';
import styled from 'styled-components';

// Types
type PostContentProps = {
  content: string;
};

// styled components
const StyledPostContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
    padding: 0 50px;
    color: #f8f8f8;
    word-break: keep-all;
  }
  @media (max-width: ${props => props.theme.mediaSize.medium}) {
    font-size: 0.875rem;
  }

  @media (max-width: ${props => props.theme.mediaSize.small}) {
    position: static;
    transform: translate(0, 0);
    background-color: rgba(0, 0, 0, 0.02);
    padding: 45px 0 20px;
    p {
      padding: 0 20px;
      color: ${props => props.theme.color.black};
    }
  }
`;

function PostContent({ content }: PostContentProps) {
  return (
    <StyledPostContent>
      <p>{content}</p>
    </StyledPostContent>
  );
}

export default PostContent;
