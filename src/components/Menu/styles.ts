import styled, { css } from 'styled-components';

interface MenuProps {
  isShowing: boolean;
}

export const Container = styled.div`
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      cursor: pointer;

      color: #000;

      width: 40px;
      height: 40px;
    }

    a {
      text-decoration: none;

      margin-left: 8px;

      font: 32px Roboto, sans-serif;
      font-weight: 700;
      color: #000;

      cursor: pointer;
    }
  }
`;
