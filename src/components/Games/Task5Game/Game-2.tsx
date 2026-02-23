import React, { useEffect, useMemo, useState } from "react";
import CorrectCircleIcon from "src/assets/correct-circle.svg";
import WrongCircleIcon from "src/assets/wrong-circle.svg";
import { APP_LANG } from "src/constants";
import { useDemoReset } from "src/hooks/useDemoReset";
import { useResult } from "src/hooks/useResult";
import { t } from "src/lib/translations";
import { Button } from "src/NewComponents/Button";
import { demoNextStep, diffTime, isDemoPage } from "src/utils/helpers";

interface Props {
  onSuccess: () => void;
  onError: () => void;
  budget: number;
}

const HUNDREDS = [20, 10, 5, 2];

function emptyCash() {
  return {
    ...Object.fromEntries(HUNDREDS.map((x) => [x, 0])),
    ...Object.fromEntries(CENTS.map((x) => [x, 0])),
  };
}

const IS_CHINESE = APP_LANG === "MANDARIN";
const CENTS = IS_CHINESE ? [1, 0.5, 0.1, 0.05] : [1, 0.5, 0.2, 0.1];

function getAmount(budget: number) {
  return {
    hundreds: (budget > 10 ? 5 : 0) + Math.round(Math.random() * budget),
    cents: (Math.round(Math.random() * 100) * (IS_CHINESE ? 5 : 10)) % 100,
  };
}

export const Game2: React.FC<Props> = ({ onSuccess, onError, budget }) => {
  const [cash, setCash] = useState<Record<number, number>>(emptyCash());
  const start = useMemo(() => new Date().getTime(), []);
  const { result, setResult, resetResult } = useResult();

  const { hundreds, cents } = useMemo(() => getAmount(budget), [budget]);

  useEffect(() => {
    if (!result) return;
    const fn = result === "success" ? onSuccess : onError;

    const timeout = setTimeout(fn, 500, {
      time: diffTime(start) + "s",
      success: result === "success" ? "Yes" : "No",
    });

    return () => clearTimeout(timeout);
  }, [result]);

  const showMessage = [...HUNDREDS, ...CENTS].find((x) => cash[x]);
  function getResultIcon() {
    if (result === "success") return <CorrectCircleIcon className="size-48" />;
    else if (result === "error") return <WrongCircleIcon className="size-48" />;
    else return null;
  }

  useEffect(() => {
    if (!isDemoPage()) return;
    const cb = () => setCash(emptyCash());
    window.addEventListener("demo-cc-clear", cb);
    return () => window.removeEventListener("demo-cc-clear", cb);
  }, []);

  useDemoReset(() => {
    resetResult();
    setCash(emptyCash());
  });

  return (
    <div
      className="relative flex flex-col overflow-y-auto full"
      style={{
        background:
          "radial-gradient(108.21% 50% at 50% 50%, rgba(242, 211, 191, 0.4) 0%, rgba(254, 142, 68, 0.4) 100%), #FFFFFF",
      }}
    >
      {result && <div className="absolute inset-0 z-50 c">{getResultIcon()}</div>}

      <div className="flex-grow cc !justify-evenly">
        <div className="my-2 w-fit tall:my-6">
          <div
            id="gs-required-money"
            className="h-24 mx-auto font-extrabold text-6xl text-white border-8 bg-[#34373A] border-[#5F6363] c w-80 md:scale-125 lg:scale-150"
          >
            {IS_CHINESE ? "¥" : "$"} {hundreds}.{cents}
            {cents > 9 ? "" : "0"}
          </div>
          {showMessage ? (
            <div className="mx-auto text-center w-90 md:w-full animate-slide-down md:text-2xl lg:text-3xl">
              {t.GS["Tap on the note or coin to remove it."]}
            </div>
          ) : (
            <div className="opacity-0 w-90">placeholder</div>
          )}
        </div>
        <div id="gs-money-counter" className="flex gap-1 md:gap-4 lg:gap-6 min-h-44">
          {HUNDREDS.map((x) => (
            <button
              key={x}
              className="w-[72px] md:w-24 lg:w-28 relative"
              onClick={() => (setCash({ ...cash, [x]: cash[x] - 1 }), demoNextStep("gs-money-remove"))}
              style={{ display: cash[x] ? undefined : "none" }}
            >
              <img src={`/images/task-5/game-2/${APP_LANG}/${x}.png`} />
              <Highlight num={cash[x]} />
            </button>
          ))}

          <div className="items-center fc justify-evenly">
            {CENTS.map((x) => (
              <button
                key={x}
                className="relative"
                onClick={() => (setCash({ ...cash, [x]: cash[x] - 1 }), demoNextStep("gs-money-remove"))}
                style={{ display: cash[x] ? undefined : "none" }}
              >
                <img
                  src={`/images/task-5/game-2/${APP_LANG}/${x * 100}-cent.png`}
                  style={{ height: (x * 100) / 4 + 30 }}
                />
                <Highlight num={cash[x]} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="gs-money-register" className="bg-[#787878] md:py-5 lg:py-10">
        <div className="grid grid-cols-4 gap-2 px-4 py-2 mx-auto tall:py-4 w-fit">
          {HUNDREDS.map((x) => (
            <button
              key={x}
              className="bg-[#303A43] pt-2 px-1 w-20 h-[185px] md:h-56 md:w-24 lg:w-28 lg:h-64 relative"
              onClick={() => (setCash({ ...cash, [x]: cash[x] + 1 }), demoNextStep("gs-money-add"))}
            >
              <img src={`/images/task-5/game-2/${APP_LANG}/${x}.png`} className="w-[72px] md:w-[88px] lg:w-[104px]" />
            </button>
          ))}

          {CENTS.map((x) => (
            <button
              key={x}
              className="bg-[#303A43] size-20 c pt-2 relative md:size-24 lg:size-28"
              onClick={() => (setCash({ ...cash, [x]: cash[x] + 1 }), demoNextStep("gs-money-add"))}
            >
              <img
                src={`/images/task-5/game-2/${APP_LANG}/${x * 100}-cent.png`}
                className="size-16 md:size-20 lg:size-24"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="py-3 tall:py-5 px-6 bg-[#3A3A3A] w-full c">
        <Button
          btn="task5"
          className="md:scale-125 lg:scale-150"
          onClick={() => {
            const a_hundreds = [20, 10, 5, 2, 1].map((x) => cash[x] * x).reduce((a, b) => a + b);
            const a_cents = [0.5, IS_CHINESE ? 0.05 : 0.2, 0.1]
              .map((x) => Math.round(cash[x] * x * 100))
              .reduce((a, b) => a + b);
            const a_total = a_hundreds + a_cents / 100;
            const total = hundreds + cents / 100;
            if (a_total === total) setResult("success");
            else {
              setResult("error");

              if (isDemoPage()) {
                setTimeout(() => {
                  setResult("");
                }, 1000);
              }
            }
          }}
        >
          {t.FORGOT_PASSWORD.Submit}
        </Button>
      </div>
    </div>
  );
};

function Highlight({ num = 0 }) {
  if (num < 2) return null;

  return (
    <div className="absolute size-5 md:scale-150 lg:scale-[1.75] text-white bg-orange-500 rounded-full c -right-1.5 -top-1.5 z-[100]">
      {num}
    </div>
  );
}
