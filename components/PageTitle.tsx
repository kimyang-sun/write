import React from 'react';
import styled from 'styled-components';

// Types
type PageTitleProps = {
  title: string;
};

const StyledPageTitle = styled.h2`
  font-size: 1.25rem;
  display: inline-block;
  padding-bottom: 5px;
  margin-bottom: 30px;
  border-bottom: 2px solid ${props => props.theme.color.main};
`;

// export
function PageTitle({ title }: PageTitleProps) {
  return <StyledPageTitle>{title}</StyledPageTitle>;
}

export default PageTitle;
