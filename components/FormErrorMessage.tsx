import React from 'react';
import styled from 'styled-components';

// Types
type FormErrorMessage = {
  errorMessage: string;
};

// styled conponents
const StyledFormErrorMessage = styled.div`
  position: absolute;
  padding-left: 5px;
  color: ${props => props.theme.color.main};
`;

// export
function FormErrorMessage({ errorMessage }: FormErrorMessage) {
  return <StyledFormErrorMessage>{errorMessage}</StyledFormErrorMessage>;
}

export default FormErrorMessage;
