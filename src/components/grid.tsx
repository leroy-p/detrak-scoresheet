import { useState } from "react";
import styled from "styled-components";

import { GRID_SIZE } from "../hooks/use-game";
import { ICell } from "../hooks/use-grid";
import Cell from "./cell";
import SelectorDialog from "./selector-dialog";

interface IProps {
  cells: ICell[];
  rowScores: number[];
  columnScores: number[];
  diagonalScore: number;
  totalScore: number;
  gameEnded: boolean;
  setCellValue: (index: number, value: number) => void;
}

function Grid({
  cells,
  rowScores,
  columnScores,
  diagonalScore,
  totalScore,
  gameEnded,
  setCellValue,
}: IProps) {
  const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);

  function selectCellValue(value: number) {
    setCellValue(selectedCellIndex, value);
    setSelectedCellIndex(-1);
  }

  const allRowScores = [diagonalScore, ...rowScores];
  const allColumnScores = [diagonalScore, ...columnScores];

  return (
    <>
      <Container>
        <GridContainer>
          <div>
            {cells.map((cell, index) => (
              <Cell
                action={() => setSelectedCellIndex(index)}
                diagonal={cell.diagonal}
                disabled={cell.disabled}
                index={index}
                key={index}
                value={cell.value}
              />
            ))}
          </div>
        </GridContainer>
        <RowScoresContainer>
          <div>
            {allRowScores.map((rowScore, index) => (
              <ScoreCellContainer index={index} key={index}>
                <div>{rowScore !== -1 && <p>{rowScore}</p>}</div>
              </ScoreCellContainer>
            ))}
          </div>
        </RowScoresContainer>
        <ColumnScoresContainer>
          <div>
            {allColumnScores.map((columnScore, index) => (
              <ScoreCellContainer index={index} key={index}>
                <div>{columnScore !== -1 && <p>{columnScore}</p>}</div>
              </ScoreCellContainer>
            ))}
          </div>
        </ColumnScoresContainer>
        <TotalScoreContainer>
          <div>{gameEnded && <p>{totalScore}</p>}</div>
        </TotalScoreContainer>
      </Container>
      <SelectorDialog
        close={() => setSelectedCellIndex(-1)}
        setValue={selectCellValue}
        visible={selectedCellIndex !== -1}
      />
    </>
  );
}

export default Grid;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: ${() => `${80 * (GRID_SIZE + 2)}px`};
  justify-content: center;
  position: relative;
  width: ${() => `${80 * (GRID_SIZE + 2)}px`};

  @media screen and (max-width: 820px) {
    height: ${() => `${48 * (GRID_SIZE + 2)}px`};
    width: ${() => `${48 * (GRID_SIZE + 2)}px`};
  }
`;

const GridContainer = styled.div`
  height: ${() => `${80 * GRID_SIZE}px`};
  width: ${() => `${80 * GRID_SIZE}px`};
  padding: 0;

  @media screen and (max-width: 820px) {
    height: ${() => `${48 * GRID_SIZE}px`};
    width: ${() => `${48 * GRID_SIZE}px`};
  }

  & > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const RowScoresContainer = styled.div`
  background-color: #ffffff;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;

  @media screen and (max-width: 820px) {
    width: 48px;
  }

  & > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;

const ColumnScoresContainer = styled.div`
  background-color: #ffffff;
  bottom: 0;
  height: 80px;
  left: 0;
  padding: 0;
  position: absolute;

  @media screen and (max-width: 820px) {
    height: 48px;
  }

  & > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`;

const ScoreCellContainer = styled.div<{ index: number }>`
  background-color: #ffffff;
  height: 80px;
  padding: 1px;
  width: 80px;

  @media screen and (max-width: 820px) {
    height: 48px;
    width: 48px;
  }

  & > div {
    align-items: center;
    background-color: ${({ index }) =>
      index === 0 ? "#ff000090" : "#00000090"};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;

    & > p {
      font-size: 48px;
      font-weight: bold;

      @media screen and (max-width: 820px) {
        font-size: 24px;
      }
    }
  }
`;

const TotalScoreContainer = styled.div`
  background-color: #ffffff;
  bottom: 0;
  height: 80px;
  padding: 1px;
  position: absolute;
  right: 0;
  width: 80px;

  @media screen and (max-width: 820px) {
    height: 48px;
    width: 48px;
  }

  & > div {
    align-items: center;
    background-color: #00000090;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;

    & > p {
      color: #ff6e67;
      font-size: 48px;
      font-weight: bold;

      @media screen and (max-width: 820px) {
        font-size: 24px;
      }
    }
  }
`;
