import Head from "next/head";
import { useEffect, useRef } from "react";
import { DemoScreen } from "src/components/Demo";
import { DemoProvider } from "src/components/Demo/DemoContext";
import { DemoIndicator } from "src/components/Demo/DemoIndicator";
import { Task2Game, resetSkipShuffle } from "src/components/Games/Task2Game";
import { HandIcon } from "src/components/Icons/HandIcon";
import { Score } from "src/components/Score";
import IMAGES from "src/constants/IMAGES.json";
import { task2 } from "src/constants/tasks";
import { preloadImages } from "src/lib/image-cache";
import { t } from "src/lib/translations";
import { DemoStep } from "src/types";
import { demoNextStep } from "src/utils/helpers";

const steps: DemoStep[] = [
  {
    elements: [{ id: "sb-main-icon", instruction: "Focus on the symbol at the top of the screen." }],
    delay: 400,
    voiceover: "SM_2.mp3",
  },
  {
    elements: [
      {
        id: "sb-reference-icon-6",
        className: "scale-125",
        instruction: t.SM["Look for the matching symbol and its number. Here, it is 6."],
        arrowStyle: { transform: "translateX(-67px)" },
      },
    ],
    voiceover: "SM_3.mp3",
  },
  {
    elements: [
      {
        id: "sb-number-pad-6",
        side: "top",
        className: "scale-125 rounded-full",
        instructionClassName: "mb-8",
        instruction: t.SM["Tap “6” in the number pad below."],
        showPreviousBtn: true,
        showNextBtn: false,
        arrow: false,
      },
      {
        id: "sb-number-pad-6",
        className: "bg-transparent z-10",
        children: (
          <div className="translate-x-1/2 translate-y-2/3 animate-pulse">
            <HandIcon fill="#b7430a" background="white" className="size-12 sm:size-16 md:size-20" />
          </div>
        ),
        onClick: () => {
          document.getElementById("sb-number-pad-6")?.click();
          demoNextStep();
        },
      },
    ],
    interactive: true,
    voiceover: "SM_4.mp3",
  },
  {
    elements: [
      {
        id: "sb-reference-icons",
        instruction: "Be careful, the order of the symbols will change after every turn.",
        showPreviousBtn: false,
      },
    ],
    delay: 1000,
    voiceover: "SM_5.mp3",
  },
  {
    elements: [
      {
        id: "demo-center",
        instructionClassName: "-translate-y-1/2",
        instruction: t.SM["Now try out the next 3 rounds by yourself!"],
        arrow: false,
        texts: {
          next: t.GAME_SPECIFIC["Start demo"],
        },
      },
    ],
    voiceover: "SM_6.mp3",
  },
  {
    elements: [],
  },
];

export default function GameDemo() {
  const score = useRef(-1); // start from -1 since first success will increment to 0
  resetSkipShuffle();
  useEffect(() => {
    preloadImages(IMAGES["task-2"], "/images/task-2");
  }, []);

  return (
    <DemoProvider
      value={{
        name: "SM",
        title: task2.title,
        steps: steps,
        texts: {},
        colors: {
          color: task2.color,
          secondaryColor: "#A969C7",
          previousBtn1: "#FDFDFD",
          previousBtn2: "#E0D0E7",
          arrow2: "#E0D0E7",
        },
      }}
    >
      <Head>
        <meta name="theme-color" content={task2.color} />
      </Head>

      <DemoScreen>
        <Task2Game
          tiles={10}
          onError={() => {}}
          onSuccess={() => {
            score.current++;
            if (score.current % 3 === 0) demoNextStep();
          }}
        >
          <div className="items-center justify-between w-full f">
            <Score score={0} className="text-2xl font-bold leading-6 text-task2" />
            <DemoIndicator />
          </div>
        </Task2Game>
      </DemoScreen>
    </DemoProvider>
  );
}
