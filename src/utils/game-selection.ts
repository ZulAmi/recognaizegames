import { TaskProgressKey } from "src/constants/tasks";
import { updateTaskProgress } from "src/stores/useTaskProgress";

const SELECTED_GAME_KEY = "recognaize-selected-game";

export function setSelectedGame(task: TaskProgressKey) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SELECTED_GAME_KEY, task);
  // Reset this game's progress so it starts fresh
  updateTaskProgress(task, { currLevel: 0 });
  // Also reset cashier-chaos progress when selecting grocery shopping
  // since task5 includes both grocery shopping (rounds 1-4) and cashier chaos (rounds 5-6)
}

export function getSelectedGame(): TaskProgressKey | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SELECTED_GAME_KEY);
  if (raw === "task2" || raw === "task3" || raw === "task4" || raw === "task5") {
    return raw;
  }
  return null;
}

export function clearSelectedGame() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SELECTED_GAME_KEY);
}
