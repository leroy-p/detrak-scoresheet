import styled from "styled-components";
import Div100vh from "react-div-100vh";

import { useGame } from "../hooks/use-game";
import Grid from "../components/grid";
import GameEndedDialog from "../components/game-ended-dialog";
import { useState } from "react";

function Root() {
  const {
    cells,
    gameEnded,
    rowScores,
    columnScores,
    diagonalScore,
    totalScore,
    setCellValue,
  } = useGame();
  const [showGameEndedDialog, setShowGameEndedDialog] = useState<boolean>(true);

  return (
    <Container>
      <h1>Detrak</h1>
      <Grid
        cells={cells}
        columnScores={columnScores}
        gameEnded={gameEnded}
        diagonalScore={diagonalScore}
        rowScores={rowScores}
        setCellValue={setCellValue}
        totalScore={totalScore}
      />
      <GameEndedDialog
        score={totalScore}
        visible={gameEnded && showGameEndedDialog}
        close={() => setShowGameEndedDialog(false)}
      />
    </Container>
  );
}

export default Root;

const Container = styled(Div100vh)`
  align-items: center;
  background-color: #000000d0;
  display: flex;
  flex-direction: column;
  gap: 48px;
  justify-content: center;
  overflow: hidden;
  width: 100vw;

  & > h1 {
    font-size: 48px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;
