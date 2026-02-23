import { getSelectedGame } from "src/utils/game-selection";

export function verifyCompletedTasks(currTask: string) {
  // Allow any game to be played if it's the selected game
  const selectedGame = getSelectedGame();
  if (selectedGame && currTask === selectedGame) {
    return true;
  }
  // For sub-games (cashier-chaos is part of task5/grocery-shopping)
  if (currTask === "task5" && selectedGame === "task5") {
    return true;
  }
  // Fallback: allow if selected
  return !!selectedGame;
}
