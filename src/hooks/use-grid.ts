import { useState } from "react";

export interface ICell {
  value: number;
  diagonal: boolean;
  disabled: boolean;
}

export function useGrid(size: number) {
  const [cells, setCells] = useState<ICell[]>(getDefaultCells());
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [rowScores, setRowScores] = useState<number[]>(
    new Array(size).fill(-1)
  );
  const [columnScores, setColumnScores] = useState<number[]>(
    new Array(size).fill(-1)
  );
  const [diagonalScore, setDiagonalScore] = useState<number>(-1);

  function getDefaultCells(): ICell[] {
    const result = [];

    for (let i = 0; i < size * size; i++) {
      result.push({ value: 0, diagonal: checkDiagonal(i), disabled: i > 0 });
    }

    return result;
  }

  function checkDiagonal(index: number): boolean {
    for (let i = 1; i <= size; i++) {
      if (index === i * size - i) {
        return true;
      }
    }

    return false;
  }

  function getAdjacentIndexes(index: number): number[] {
    const result = [];

    if (index >= size) {
      result.push(index - size);
    }

    if (index < size * size - size) {
      result.push(index + size);
    }

    if (index % size > 0) {
      result.push(index - 1);
    }

    if (index % size < size - 1) {
      result.push(index + 1);
    }

    return result;
  }

  function setCellValue(index: number, value: number) {
    if (index < 0 || index >= cells.length) return;

    const _cells = [...cells];

    _cells[index].value = value;

    if (selectedIndex === -1 && initialized) {
      const adjacentIndexes = getAdjacentIndexes(index);

      for (let i = 0; i < size * size; i++) {
        _cells[i].disabled =
          !adjacentIndexes.includes(i) && _cells[i].value === 0;
      }
    } else {
      for (let i = 0; i < size * size; i++) {
        const adjacentIndexes = getAdjacentIndexes(i);
        const disabled =
          _cells[i].value === 0 &&
          adjacentIndexes.filter(
            (adjacentIndex) => _cells[adjacentIndex].value === 0
          ).length === 0;

        _cells[i].disabled = disabled;
      }
    }

    setCells(_cells);
    setSelectedIndex(initialized && selectedIndex === -1 ? index : -1);
    setInitialized(true);
  }

  function updateRowScores() {
    if (!initialized || selectedIndex !== -1) return;

    const scores = [];

    for (let i = 0; i < size; i++) {
      let score = 0;
      let streakCount = 1;
      let streakValue = 0;

      for (let j = 0; j < size; j++) {
        const cell = cells[i * size + j];

        if (cell.value === 0 && !cell.disabled) {
          score = -1;

          break;
        }

        if (cell.value > 0 && cell.value === streakValue) {
          streakCount += 1;

          if (j === size - 1) {
            score += getStreakScore(streakCount);
            streakCount = 1;
          }
        } else {
          score += getStreakScore(streakCount);
          streakCount = 1;
        }

        streakValue = cell.value;
      }

      scores.push(score === 0 ? -5 : score);
    }

    setRowScores(scores);
  }

  function updateColumnScores() {
    if (!initialized || selectedIndex !== -1) return;

    const scores = [];

    for (let i = 0; i < size; i++) {
      let score = 0;
      let streakCount = 1;
      let streakValue = 0;

      for (let j = 0; j < size; j++) {
        const cell = cells[i + size * j];

        if (cell.value === 0 && !cell.disabled) {
          score = -1;

          break;
        }

        if (cell.value > 0 && cell.value === streakValue) {
          streakCount += 1;

          if (j === size - 1) {
            score += getStreakScore(streakCount);
            streakCount = 1;
          }
        } else {
          score += getStreakScore(streakCount);
          streakCount = 1;
        }

        streakValue = cell.value;
      }

      scores.push(score === 0 ? -5 : score);
    }

    setColumnScores(scores);
  }

  function updateDiagonalScore() {
    if (!initialized || selectedIndex !== -1) return;

    const diagonalCells = cells.filter((cell) => cell.diagonal);
    let score = 0;
    let streakCount = 1;
    let streakValue = 0;

    for (let i = 0; i < diagonalCells.length; i++) {
      const cell = diagonalCells[i];

      if (cell.value === 0 && !cell.disabled) {
        score = -1;

        break;
      }

      if (cell.value > 0 && cell.value === streakValue) {
        streakCount += 1;

        if (i === diagonalCells.length - 1) {
          score += getStreakScore(streakCount);
          streakCount = 1;
        }
      } else {
        score += getStreakScore(streakCount);
        streakCount = 1;
      }

      streakValue = cell.value;
    }

    setDiagonalScore(score === 0 ? -5 : score);
  }

  function updateScores() {
    updateRowScores();
    updateColumnScores();
    updateDiagonalScore();
  }

  function getStreakScore(value: number): number {
    if (value > 3) return value * 2;
    if (value > 1) return value;

    return 0;
  }

  function getTotalScore(): number {
    const rowTotalScore = rowScores.reduce((acc, value) => acc + value, 0);
    const columnTotalScore = columnScores.reduce(
      (acc, value) => acc + value,
      0
    );

    return rowTotalScore + columnTotalScore + 2 * diagonalScore;
  }

  return {
    cells,
    rowScores,
    columnScores,
    diagonalScore,
    setCellValue,
    updateScores,
    getTotalScore,
  };
}
