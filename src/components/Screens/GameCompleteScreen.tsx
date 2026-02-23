import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiSpinnerBold } from "react-icons/pi";
import { TaskProgressKey } from "src/constants/tasks";
import { am } from "src/lib/audio-manager";
import { Button } from "src/NewComponents/Button";
import { saveResult, useResultStore } from "src/stores/useResultStore";
import { saveProgress, useTaskProgress } from "src/stores/useTaskProgress";
import { ResultType } from "src/types";
import { clearSelectedGame } from "src/utils/game-selection";

export interface GameCompleteScreenProps extends React.PropsWithChildren {
  result: ResultType;
  color: string;
  task: TaskProgressKey;
  showBackground?: boolean;
  skip?: boolean;
}

const TASK_TO_LIGHT: Record<string, string> = {
  task2: "#E0D0E7",
  task3: "#D0E7E0",
  task4: "#D0E3E7",
  task5: "#DBDBDB",
};

const TASK_TO_GRADIENT: Record<string, string> = {
  task2: "radial-gradient(108.21% 50% at 50% 50%, rgba(228, 227, 255, 0.4) 0%, rgba(214, 141, 232, 0.4) 100%), #FFFFFF",
  task3: "radial-gradient(108.21% 50% at 50% 50%, rgba(200, 248, 216, 0.4) 0%, rgba(68, 234, 124, 0.4) 100%), #FFFFFF",
  task4: "radial-gradient(108.21% 50% at 50% 50%, rgba(175, 205, 250, 0.4) 0%, rgba(61, 136, 253, 0.4) 100%), #FFFFFF",
  task5: "radial-gradient(108.21% 50% at 50% 50%, rgba(242, 211, 191, 0.4) 0%, rgba(254, 142, 68, 0.4) 100%), #FFFFFF",
};

export function GameCompleteScreen({
  result,
  color,
  task,
  children,
  showBackground = true,
  skip,
}: GameCompleteScreenProps) {
  const router = useRouter();
  const { isSubmitting: resultSubmitting, error: resultError } = useResultStore();
  const { isSubmitting: taskSubmitting, error: taskError } = useTaskProgress();

  useEffect(() => {
    if (skip) return;
    if (result) {
      am.play(router.pathname.split("/")[1]);
      saveResult();
      saveProgress();
    }
  }, [result]);

  if (!result) return children;

  let content;
  if (resultSubmitting && taskSubmitting) {
    content = (
      <div className="space-y-16 text-center md:scale-125 lg:scale-150 cc">
        <PiSpinnerBold size={72} className="animate-spin" />
        <p className="text-lg">Saving your result, please wait.</p>
      </div>
    );
  } else if (resultError || taskError) {
    content = (
      <div className="space-y-16 text-center md:scale-125 lg:scale-150 cc">
        <p className="text-lg">Error saving your result.</p>
        <p className="text-lg w-80">Please check your internet connection and try again.</p>
        {/* <p className="text-red-500 text-md">{resultError}</p> */}
        <Button
          btn={task}
          className="w-84"
          onClick={() => {
            saveResult();
            saveProgress();
          }}
        >
          RETRY
        </Button>
      </div>
    );
  } else {
    content = (
      <div className="justify-between h-full py-4 fc">
        <div className="w-full h-12" />
        <div className="space-y-8 text-center">
          <div
            className="mx-auto bg-white rounded-full c size-24"
            style={{
              backgroundImage: `linear-gradient(to bottom, #FDFDFD, ${TASK_TO_LIGHT[task]} 180%)`,
              boxShadow: "0px 4px 24px -1px rgba(167, 210, 208, 0.25)",
              backdropFilter: "blur(15px)",
            }}
          >
            <FaCheck className="mx-auto size-14" style={{ color: color + "bb" }} />
          </div>
          <h2 style={{ color, lineHeight: "42px" }}>Game Complete</h2>
        </div>
        <Button
          btn={task}
          className="w-84"
          onClick={() => {
            clearSelectedGame();
            Router.replace("/about");
          }}
        >
          Back to Games
        </Button>
      </div>
    );
  }
  return (
    <div
      className="c z-[1000] h-full section-padding-large"
      style={{
        background: showBackground
          ? TASK_TO_GRADIENT[task] || "radial-gradient(108.21% 50% at 50% 50%, rgba(228, 227, 255, 0.4) 0%, rgba(141, 231, 244, 0.4) 100%), #FFFFFF"
          : undefined,
        color,
      }}
    >
      {content}
    </div>
  );
}
