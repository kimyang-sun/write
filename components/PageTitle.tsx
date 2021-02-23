import React from 'react';
import styled from 'styled-components';

// Types
type PageTitleProps = {
  title: string;
};

const StyledPageTitle = styled.h2`
  font-size: 1.25rem;
`;

// export
function PageTitle({ title }: PageTitleProps) {
  return <StyledPageTitle>{title}</StyledPageTitle>;
}

export default PageTitle;
