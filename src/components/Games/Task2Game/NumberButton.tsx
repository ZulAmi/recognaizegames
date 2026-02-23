import { useEffect, useState } from "react";

interface Props extends React.PropsWithChildren {
  active?: boolean;
  onClick: () => boolean;
  className?: string;
  id: string;
}

const InitialBgColor = "linear-gradient(180deg, #8735AC 0%, #250037 100%)";

export function NumberButton({ onClick, className, children, id }: Props) {
  const [background, setBackground] = useState(InitialBgColor);

  useEffect(() => {
    const timeout = setTimeout(setBackground, 500, InitialBgColor);
    return () => clearTimeout(timeout);
  }, [background]);

  return (
    <button
      id={id}
      className={[
        "bg-gradient-to-b font-extrabold text-white rounded-full shadow-md shadow-gray-400 c h-14 w-14 tall:size-16 last:col-span-3 last:mx-auto",
        className,
      ].join(" ")}
      onClick={() =>
        onClick()
          ? setBackground("linear-gradient(180deg, #90440A 0%, #D25D03 100%)")
          : setBackground("linear-gradient(180deg, #90440A 0%, #D25D03 100%)")
      }
      style={{
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))",
        background,
        fontSize: 32,
        lineHeight: "40px",
      }}
    >
      {children}
    </button>
  );
}
