import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

interface ItemProps {
  isSelected: boolean;
}

interface GameInfoProps {
  isOpened: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const Content = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  margin: 48px auto;

  @media only screen and (max-width: 1000px) {
    margin: 48px 0;
  }

  width: 100%;
  max-width: 1200px;
  padding: 20px;

  display: flex;
  flex-direction: column;

  background-color: #fff;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);

  animation: ${appearFromTop} 1s;

  > h1 {
    width: 100%;
    text-align: center;
    font: 32px Roboto, sans-serif;
    font-weight: 700;
    color: #000;
  }
`;

export const GamesResults = styled.div`
  display: flex;
  margin-top: 32px;
  flex-direction: column;

  h1 {
    font: 24px Roboto, sans-serif;
    font-weight: 700;
    color: #000;
  }
`;

export const GameSearchContainer = styled.div`
  width: 100%;
  max-width: 300px;
`;

export const SearchInput = styled.div`
  background: #f0f2fd;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  margin-top: 16px;

  border: 2px solid #f0f2fd;
  color: #838bc5;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
    min-height: 20px;
    min-width: 20px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #838bc5;

    &::placeholder {
      color: #838bc5;
    }
  }
`;

export const GamesBet = styled.div`
  display: flex;
  margin-top: 32px;
  flex-direction: column;

  h1 {
    font: 24px Roboto, sans-serif;
    font-weight: 700;
    color: #000;
  }

  button {
    max-width: 300px;
  }
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f0f2fd;
  padding: 16px;
  margin: 0 auto;
  margin-top: 16px;
  border-radius: 10px;

  .top-info {
    display: flex;
    justify-content: space-between;

    h1 {
      display: flex;
      align-items: center;

      margin-bottom: 16px;

      span {
        cursor: pointer;
        margin-left: 8px;
        font: 16px Roboto, sans-serif;
        font-weight: 500;
        color: #838bc5;
      }
    }
    svg {
      cursor: pointer;
      width: 30px;
      height: 30px;
      color: #000;
    }
  }
`;

export const GameInfo = styled.div<GameInfoProps>`
  width: 100%;
  height: 0px;
  overflow: hidden;
  margin-bottom: 16px;

  ${props =>
    props.isOpened &&
    css`
      height: 100%;
    `}

  h2, h3 {
    font: 16px Roboto, sans-serif;
    font-weight: 700;
    color: #000;
  }

  h3 {
    margin-top: 8px;
    font-weight: 500;
    color: #838bc5;

    span {
      color: #000;
      font-weight: 400;
    }
  }
`;

export const BetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f0f2fd;
  padding: 16px;
  margin: 0 auto;
  margin-top: 16px;
  border-radius: 10px;

  .top-info {
    display: flex;
    justify-content: space-between;

    h1 {
      margin-bottom: 16px;
    }
    svg {
      cursor: pointer;
      width: 30px;
      height: 30px;
      color: #000;
    }
  }
`;

export const ItemValue = styled.button<ItemProps>`
  height: 50px;
  width: 50px;
  border: 0;
  border-radius: 50%;
  background-color: #fff;
  margin: 8px;

  ${props =>
    props.isSelected &&
    css`
      background-color: #838bc5;
    `}
`;
