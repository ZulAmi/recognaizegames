import { Howl } from "howler";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ReplayIcon from "src/assets/replay.svg";
import { APP_LANG } from "src/constants";

export interface ReplayButtonProps {
  source?: string;
}

export function DemoReplayButton({ source }: ReplayButtonProps) {
  const ref = useRef<Howl>(
    new Howl({
      src: [`/sounds/voiceover/${APP_LANG}/${source}`],
      html5: true,
      loop: false,
    })
  );

  useEffect(() => {
    // ref.current.stop();
    // ref.current.play();
    console.log("[SOUND]: start", source);
    return () => {
      // ref.current.stop();
      console.log("[SOUND]: stop", source);
    };
  }, []);

  return createPortal(
    <button
      className="absolute bottom-6 inset-x-0 mx-auto z-[1001] text-zinc-700 font-bold w-fit py-2 text-base-22 drop-shadow-md bg-white f rounded-full c px-4 c-shadow"
      onClick={() => {
        // ref.current.stop();
        // ref.current.play();
      }}
    >
      <ReplayIcon className="mr-2 size-5" /> Replay audio
    </button>,
    document.getElementById("__next")!
  );
}
