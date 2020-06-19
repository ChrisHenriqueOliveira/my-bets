/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback } from 'react';

import { parseISO, format } from 'date-fns';
import { IoMdTrash, IoIosSearch } from 'react-icons/io';
// import { string } from 'yup';
import { string } from 'yup';
import Menu from '../../components/Menu';

import {
  Container,
  Content,
  AnimationContainer,
  GamesResults,
  GameSearchContainer,
  SearchInput,
  GamesBet,
  ResultContainer,
  GameInfo,
  BetContainer,
  ItemValue,
} from './styles';
import Button from '../../components/Button';

interface Results {
  gamenumber: string;
  results: string[];
  date: string;
  quinzeacertos: string;
  quatorzeacertos: string;
  trezeacertos: string;
  dozeacertos: string;
  onzeacertos: string;
}

const Home: React.FC = () => {
  const [myBets, setMyBets] = useState([[]]);
  const [resultGames, setResultGames] = useState<Results[]>([
    {
      gamenumber: '1981',
      results: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '12',
        '13',
        '15',
        '17',
        '20',
        '23',
        '24',
        '25',
      ],
      date: '17/06/2020',
      quinzeacertos: `5 ganhadores - R$430519.74`,
      quatorzeacertos: `5 ganhadores - R$430519.74`,
      trezeacertos: `5 ganhadores - R$430519.74`,
      dozeacertos: `5 ganhadores - R$430519.74`,
      onzeacertos: `5 ganhadores - R$430519.74`,
    },
  ]);

  const [gameId, setGameId] = useState('');

  const [valuesChanged, setValuesChanged] = useState(false);

  const [gameInfoOpened, setGameInfoOpened] = useState('');

  // RESULTS CONTROLLERS =========================================================

  const handleSearchGame = useCallback(() => {
    // const repeatedResult = resultGames.filter(
    //   item => item.gamenumber === gameId,
    // );
    // if (repeatedResult.length === 0) {
    //   fetch(
    //     `https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=[SEU_TOKEN]&concurso=${gameId}`,
    //   )
    //     .then(response => response.json())
    //     .then(data => {
    //       const newGame: Results = {
    //         gamenumber: gameId,
    //         results: data.dezenas,
    //         date: format(parseISO(data.data_concurso), 'dd/MM/yyyy'),
    //         quinzeacertos: `${data.premiacao[0].quantidade_ganhadores} ganhadores - $${data.premiacao[0].valor_total}`,
    //         quatorzeacertos: `${data.premiacao[1].quantidade_ganhadores} ganhadores - $${data.premiacao[1].valor_total}`,
    //         trezeacertos: `${data.premiacao[2].quantidade_ganhadores} ganhadores - $${data.premiacao[2].valor_total}`,
    //         dozeacertos: `${data.premiacao[3].quantidade_ganhadores} ganhadores - $${data.premiacao[3].valor_total}`,
    //         onzeacertos: `${data.premiacao[4].quantidade_ganhadores} ganhadores - $${data.premiacao[4].valor_total}`,
    //       };
    //       setResultGames([...resultGames, newGame]);
    //     });
    // }
  }, [gameId, resultGames]);

  const handleRemoveResult = useCallback(
    indexToRemove => {
      const currentVector = resultGames;
      delete currentVector[indexToRemove];

      const filteredVector = currentVector.filter(
        function removeEmptyValuesFromVector(el) {
          return el != null;
        },
      );
      setResultGames(filteredVector);
    },
    [resultGames],
  );

  const renderResultItems = useCallback(item => {
    const values = [];
    for (let i = 1; i <= 25; i++) {
      const isSelected = item.results.includes(
        i < 10 ? 0 + i.toString() : i.toString(),
      );
      values.push(
        <ItemValue type="button" isSelected={isSelected} key={i}>
          {i}
        </ItemValue>,
      );
    }
    return values;
  }, []);

  // USER BET CONTROLLERS =========================================================

  const handleBetClick = useCallback(
    (value, index) => {
      const betsVector = myBets;
      const currentVector = betsVector[index];

      if (betsVector.length > 0 && currentVector.length < 15) {
        const currentValue: never = value.toString() as never;
        const existInBetList = myBets[index].includes(currentValue);

        if (existInBetList) {
          const vectorPosition = currentVector.indexOf(currentValue);
          delete currentVector[vectorPosition];

          const filteredVector = currentVector.filter(
            function removeEmptyValuesFromVector(el) {
              return el != null;
            },
          );

          betsVector[index] = filteredVector;

          setMyBets(betsVector);
        } else {
          currentVector.push(currentValue);

          betsVector[index] = currentVector;

          setMyBets(betsVector);
        }
        setValuesChanged(!valuesChanged);
      }
    },
    [myBets, valuesChanged],
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

  return (
    <Container>
      <Content>
        <Menu />
        <AnimationContainer>
          <h1>Calculadora de resultados - Lotofácil</h1>
          <GamesResults>
            <h1>Resultados dos jogos</h1>

            <GameSearchContainer>
              <SearchInput>
                <IoIosSearch />
                <input
                  type="text"
                  name="gameid"
                  placeholder="Nº do concurso"
                  onChange={e => setGameId(e.currentTarget.value)}
                />
              </SearchInput>
              <Button onClick={handleSearchGame}>Pesquisar</Button>
            </GameSearchContainer>

            {resultGames.map((result, index) => {
              return (
                <ResultContainer key={index}>
                  <div className="top-info">
                    <h1>
                      {`Concurso ${result.gamenumber} - ${result.date} `}
                      <span
                        role="button"
                        tabIndex={0}
                        onKeyDown={() =>
                          setGameInfoOpened(
                            gameInfoOpened === '' ? index.toString() : '',
                          )}
                        onClick={() =>
                          setGameInfoOpened(
                            gameInfoOpened === '' ? index.toString() : '',
                          )}
                      >
                        Mais informações
                      </span>
                    </h1>
                    <IoMdTrash onClick={() => handleRemoveResult(index)} />
                  </div>
                  <GameInfo isOpened={gameInfoOpened === index.toString()}>
                    <h2>Premiação</h2>
                    <h3>
                      15 acertos: <span>{result.quinzeacertos}</span>
                    </h3>
                    <h3>
                      14 acertos: <span>{result.quatorzeacertos}</span>
                    </h3>
                    <h3>
                      13 acertos: <span>{result.trezeacertos}</span>
                    </h3>
                    <h3>
                      12 acertos: <span>{result.dozeacertos}</span>
                    </h3>
                    <h3>
                      11 acertos: <span>{result.onzeacertos}</span>
                    </h3>
                  </GameInfo>
                  {console.log(gameInfoOpened)}
                  <div>{renderResultItems(result)}</div>
                </ResultContainer>
              );
            })}
          </GamesResults>

          <GamesBet>
            <h1>Jogos apostados</h1>

            {myBets.map((bet, index) => {
              return (
                <BetContainer key={index}>
                  <div className="top-info">
                    <h1>
                      {`Jogo ${index + 1} - ${
                        myBets[index].length
                      } números selecionados`}
                    </h1>
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
