import React from 'react';
import styled from 'styled-components';

// Types
type PostImageProps = {
  imageUrl: string;
};

// styled components
const StyledPostImage = styled.img`
  width: 100%;
  display: block;
`;

function PostImage({ imageUrl }: PostImageProps) {
  return <StyledPostImage src={imageUrl} role="presentation" />;
}

export default React.memo(PostImage);
