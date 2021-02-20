import React from 'react';
import styled, { css } from 'styled-components';
import { BsSearch } from 'react-icons/bs';

// Props Type
type InputProps = {
  kind: string;
};

// Common Input
const TextInput = styled.input`
  font-size: 1rem;
  height: 40px;
  padding: 0 8px;
  margin-left: 30px;
  border-radius: 6px;
  transition: all 0.3s;
  ${props => {
    const color = props.theme.color;
    return css`
      background-color: ${color.sub};
      border: 1px solid ${color.sub};

      &:focus {
        background-color: #fff;
        border-color: ${color.main};
      }
    `;
  }}
`;

// Search
const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled(TextInput)`
  width: 250px;
  & + svg {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: ${props => props.theme.color.gray};
    transition: color 0.3s;
  }

  & + svg:hover {
    color: ${props => props.theme.color.black};
  }
`;

function Input({ kind }: InputProps) {
  if (kind === 'search') {
    return (
      <SearchBox>
        <SearchInput type="text" placeholder="검색" />
        <BsSearch size="24" />
      </SearchBox>
    );
  }

  return;
}

export default Input;
