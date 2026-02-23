import Router from "next/router";
import { useEffect } from "react";
import { Background } from "../components/Layout/Background";
import { task2, task3, task4, task5, TaskProgressKey } from "src/constants/tasks";
import { resetResults } from "src/stores/useResultStore";
import { resetTaskProgress } from "src/stores/useTaskProgress";
import { setAssessmentMode } from "src/utils/assessment";
import { setSelectedGame } from "src/utils/game-selection";

const games = [
  { key: "task2" as TaskProgressKey, task: task2 },
  { key: "task3" as TaskProgressKey, task: task3 },
  { key: "task4" as TaskProgressKey, task: task4 },
  { key: "task5" as TaskProgressKey, task: task5 },
];

export function AboutGame() {
  useEffect(() => {
    setAssessmentMode("full");
  }, []);

  const handleSelectGame = (taskKey: TaskProgressKey) => {
    resetTaskProgress();
    resetResults();
    setSelectedGame(taskKey);
    Router.push("/instruction");
  };

  return (
    <Background className="justify-start section-padding-large">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold" style={{ color: "#002D7C" }}>
            Select a Game
          </h1>
          <p className="text-sm text-gray-600">Choose a game to play</p>
        </div>

        <div className="space-y-4">
          {games.map(({ key, task }) => (
            <button
              key={key}
              onClick={() => handleSelectGame(key)}
              className="w-full p-4 bg-white rounded-2xl shadow-md border border-gray-200 flex items-center gap-4 text-left transition-all hover:shadow-lg active:scale-[0.98]"
              style={{ borderLeft: `6px solid ${task.color}` }}
            >
              <img
                className="size-16 shrink-0"
                src={`/images/play/${task.name}.png`}
                alt={task.name}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold" style={{ color: task.color }}>
                  {task.name}
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">{task.info}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Background>
  );
}
