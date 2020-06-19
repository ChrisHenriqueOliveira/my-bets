/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback } from 'react';

import { IoIosTrash, IoMdTrash } from 'react-icons/io';
import Menu from '../../components/Menu';

import {
  Container,
  Content,
  AnimationContainer,
  GamesResults,
  GamesBet,
  ResultContainer,
  BetContainer,
  ItemValue,
} from './styles';
import Button from '../../components/Button';

const Home: React.FC = () => {
  const [myBets, setMyBets] = useState([['']]);

  const [resultGames, setResultGames] = useState([[]]);

  const [valuesChanged, setValuesChanged] = useState(false);

  const handleBetClick = useCallback(
    (value, index) => {
      const existInBetList = myBets[index].includes(value.toString());
      if (existInBetList) {
        const betsVector = myBets;
        const currentVector = betsVector[index];
        const vectorPosition = currentVector.indexOf(value.toString());
        delete currentVector[vectorPosition];

        const filteredVector = currentVector.filter(
          function removeEmptyValuesFromVector(el) {
            return el != null;
          },
        );

        betsVector[index] = filteredVector;

        setMyBets(betsVector);
      } else {
        const betsVector = myBets;
        const currentVector = betsVector[index];
        currentVector.push(value.toString());

        betsVector[index] = currentVector;

        setMyBets(betsVector);
      }
      setValuesChanged(!valuesChanged);
    },
    [myBets, valuesChanged],
  );

  const renderBetItems = useCallback(
    (item, index) => {
      const values = [];
      for (let i = 1; i <= 25; i++) {
        const isSelected = item.includes(i.toString());
        values.push(
          <ItemValue
            type="button"
            isSelected={isSelected}
            key={i}
            onClick={() => handleBetClick(i, index)}
          >
            {i}
          </ItemValue>,
        );
      }
      return values;
    },
    [handleBetClick],
  );

  const handleAddBet = useCallback(() => {
    setMyBets([...myBets, []]);
  }, [myBets]);

  const handleRemoveBet = useCallback(
    indexToRemove => {
      if (myBets.length !== 1) {
        setMyBets(myBets.filter((item, index) => index !== indexToRemove));
      }
    },
    [myBets],
  );

  return (
    <Container>
      <Content>
        <Menu />
        <AnimationContainer>
          <h1>Calculadora de resultados - Lotofácil</h1>
          {/* <GamesResults>
            <h1>Resultados dos jogos</h1>

            {resultGames.map((result, index) => {
              return (
                <ResultContainer key={index}>
                  <h1>{`Jogo ${index + 1}`}</h1>
                  <div>{renderItems(result, index)}</div>
                </ResultContainer>
              );
            })}
          </GamesResults> */}

          <GamesBet>
            <h1>Jogos apostados</h1>

            {myBets.map((bet, index) => {
              return (
                <BetContainer key={index}>
                  <div className="top-info">
                    <h1>{`Jogo ${index + 1}`}</h1>
                    <IoMdTrash onClick={() => handleRemoveBet(index)} />
                  </div>

                  <div>{renderBetItems(bet, index)}</div>
                </BetContainer>
              );
            })}

            <Button onClick={handleAddBet}>Adicionar Jogo</Button>
          </GamesBet>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Home;
