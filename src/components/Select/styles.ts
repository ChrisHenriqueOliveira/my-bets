import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #f0f2fd;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #f0f2fd;
  color: #838bc5;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #838bc5;
    `}

  select {
    flex: 1;
    background: transparent;
    border: 0;
    color: #838bc5;

    &::placeholder {
      color: #838bc5;
    }
  }

  svg {
    margin-right: 16px;
    min-height: 20px;
    min-width: 20px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
