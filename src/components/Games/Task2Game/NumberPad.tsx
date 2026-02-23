import { vibrate } from "src/utils/helpers";
import { NumberButton } from "./NumberButton";

interface Props {
  isTour?: boolean;
  onTourComplete?: () => void;
  activeElement: number;
  randomList: number[];
  setResult: any;
}

export function NumberPad({ isTour, randomList, activeElement, onTourComplete, setResult }: Props) {
  return (
    <div
      id="sb-number-pad"
      className="px-5 py-3 w-full tall-lg:py-5 mx-auto rounded-[40px] c-shadow"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.435111) 50.99%, rgba(255, 255, 255, 0.415625) 87.11%, rgba(255, 255, 255, 0.0510417) 132.43%, rgba(255, 255, 255, 0) 147.3%)",
      }}
    >
      <div className="grid flex-wrap items-start grid-cols-3 gap-3 mx-auto w-fit">
        {[...Array(10)].map((_, idx) => {
          idx = (idx + 1) % 10;
          const active = randomList[idx] === activeElement;

          return (
            <NumberButton
              key={idx}
              id={`sb-number-pad-${idx}`}
              className={isTour ? (active ? "active-circle-3" : "pointer-events-none") : ""}
              onClick={() => {
                if (isTour) {
                  if (active) onTourComplete?.();
                  return true;
                }

                if (active) {
                  setResult("success");
                  return true;
                } else {
                  vibrate();
                  setResult("error");
                  return false;
                }
              }}
            >
              {idx}
            </NumberButton>
          );
        })}
      </div>
    </div>
  );
}
