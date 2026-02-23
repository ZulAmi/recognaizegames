import { useEffect, useState } from "react";
import CorrectCircleIcon from "src/assets/correct-circle.svg";
import WrongCircleIcon from "src/assets/wrong-circle.svg";
import { useResult } from "src/hooks/useResult";

function ConveyorItem({ onClick, onDrop, src, style }: any) {
  const { result, setResult } = useResult();
  const Icon = result === "success" ? CorrectCircleIcon : WrongCircleIcon;

  return (
    <div
      style={style}
      onClick={() => !result && setResult(onClick() ? "success" : "error")}
      onAnimationEnd={result ? undefined : onDrop}
      className="absolute w-32 -translate-y-1/2 md:w-36 lg:w-40 -left-1/2 conveyor-move"
    >
      <img src={src} className="full" />
      {result && <Icon className="absolute inset-0 m-auto size-28" />}
    </div>
  );
}

interface Props {
  shoppingListGroup: string[][];
  onItemClick: (x: string) => boolean;
  onItemDrop: (x: string) => boolean;
}

type CItem = { src: string; group: number };

export function Conveyor({ shoppingListGroup, onItemClick, onItemDrop }: Props) {
  const [conveyorItems, setConveyorItems] = useState<CItem[]>([]);

  function getItems(images: string[], group: number) {
    return images.sort(() => Math.random() - 0.5).map((x) => ({ src: x, group }));
  }

  function addItems(group: number) {
    const items = getItems(shoppingListGroup[group], group);

    for (let i = 0, j = 0; i < conveyorItems.length; i++) {
      if (conveyorItems[i].src) continue;
      else if (items[j]) conveyorItems[i] = items[j++];
      else break;
    }

    setConveyorItems([...conveyorItems]);
  }

  useEffect(() => {
    if (shoppingListGroup.length) {
      setConveyorItems([...shoppingListGroup.map((x, idx) => getItems(x, idx)).flat(), ...new Array(80).fill({})]);
    }
  }, [shoppingListGroup]);

  const divider = (
    <div className="drop-shadow">
      <div className="shadow-md h-11 conveyor-corner" />
      <div className="h-1.5 conveyor-corner mix-blend-hard-light" />
    </div>
  );

  return (
    <div
      id="gs-conveyor"
      className="flex flex-col justify-between shadow-md bg-[#333333] my-8 tall:my-16 h-[340px] tall-lg:h-96"
    >
      {divider}

      <div className="relative flex">
        {conveyorItems.map(({ src, group }, idx) => (
          <ConveyorItem
            key={idx}
            src={src}
            onClick={() => onItemClick(src)}
            onDrop={() => onItemDrop(src) && addItems(group)}
            style={{ animationDelay: `${idx * 1.5}s`, "--conveyor-time": "4s" } as React.CSSProperties}
          />
        ))}
      </div>
      {divider}
    </div>
  );
}
