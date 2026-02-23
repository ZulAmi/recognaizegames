import { Fragment } from "react";
import { DemoElement } from "src/types";
import { twMerge } from "tailwind-merge";
import { DemoInstruction, DemoInstructionProps } from "./DemoInstruction";

export interface DemoHighlightProps extends DemoElement {
  style: { height: number; width: number; left: number; top: number };
}

export function DemoHighlight({
  instruction,
  side = "bottom",
  className,
  onClick,
  children,
  style: { height, width, top, left, ...style },
  ...rest
}: DemoHighlightProps & DemoInstructionProps) {
  return (
    <Fragment>
      <div
        onClick={onClick}
        className={twMerge("absolute bg-white/50", className)}
        style={{ top, left, height, width }}
      >
        {children}
      </div>

      {instruction && (
        <DemoInstruction
          left={window.innerWidth / 2}
          top={side === "bottom" ? top + height : top}
          flip={side === "top"}
          instruction={instruction}
          style={style}
          {...rest}
        />
      )}
    </Fragment>
  );
}
