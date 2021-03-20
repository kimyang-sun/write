import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';

// Types
type CloseButtonProps = {
  onClose: () => void;
};

// styled components
const StyledCloseButton = styled(CloseCircleFilled)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
  :hover {
    color: ${props => props.theme.color.main};
  }
`;

// export
function CloseButton({ onClose }: CloseButtonProps) {
  return <StyledCloseButton onClick={onClose} />;
}

export default React.memo(CloseButton);
