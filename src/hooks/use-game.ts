import { useEffect, useState } from "react";
import { useGrid } from "./use-grid";

export const GRID_SIZE = 5;

export function useGame() {
  const {
    cells,
    rowScores,
    columnScores,
    diagonalScore,
    setCellValue,
    updateScores,
    getTotalScore,
  } = useGrid(GRID_SIZE);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  useEffect(() => {
    const availableCells = cells.filter(
      (cell) => !cell.disabled && cell.value === 0
    );

    setGameEnded(availableCells.length === 0);
    updateScores();
  }, [cells]);

  return {
    cells,
    gameEnded,
    rowScores,
    columnScores,
    diagonalScore,
    setCellValue,
    totalScore: gameEnded ? getTotalScore() : 0,
  };
}
