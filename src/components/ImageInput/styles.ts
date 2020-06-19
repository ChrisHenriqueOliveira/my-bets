import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused?: boolean;
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

  input {
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

  input[type='file'] {
    color: transparent;
    overflow: hidden;
  }
`;

export const ImagePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f0f2fd;

  width: 100%;
  height: 350px;
  max-width: 350px;

  border-radius: 10px;
  padding: 16px;

  .withImageSelected {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    img {
      border-radius: 10px;
      margin: 0;
      max-width: 100%;
      width: auto;
      max-height: 100%;
      height: auto;

      resize: contain;
    }
  }

  .withoutImageSelected {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    svg {
      color: #838bc5;
      margin-bottom: 16px;
    }

    button {
      border: 0;
      background-color: transparent;

      font-family: 'Roboto', serif;
      font-size: 16px;
      color: #838bc5;
    }
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
