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
  color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    padding: 0 30px;
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
