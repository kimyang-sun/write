import React from 'react';
import styled from 'styled-components';

// Types
type DialogProps = {
  children: React.ReactNode;
  onClose: () => void;
};

// styled components
const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  > * {
    font-size: 1rem;
    width: 460px;
    background-color: #fff;
    background: #ffffff;
    box-shadow: 0 10px 30px #ddd;
    padding: 20px;

    @media (max-width: ${props => props.theme.mediaSize.small}) {
      width: 100%;
    }
  }
`;

// export
function Dialog({ children, onClose }: DialogProps) {
  return <DialogContainer onClick={onClose}>{children}</DialogContainer>;
}

export default Dialog;
