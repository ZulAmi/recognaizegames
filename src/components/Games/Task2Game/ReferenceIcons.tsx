import { motion } from "framer-motion";
import { IconList } from "./utils";

export function ReferenceIcons({ randomList }: { randomList: number[] }) {
  return (
    <div
      id="sb-reference-icons"
      className="grid grid-cols-5 w-full rounded-[40px] gap-2 tall:gap-6 c-shadow px-4 py-1.5 tall:p-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.435111) 50.99%, rgba(255, 255, 255, 0.415625) 87.11%, rgba(255, 255, 255, 0.0510417) 132.43%, rgba(255, 255, 255, 0) 147.3%)",
      }}
    >
      {[...Array(10)].map((_, idx) => (
        <div key={idx} id={`sb-reference-icon-${idx}`} className="w-fit">
          <h5 className="text-lg font-bold text-center" style={{ fontSize: 20, lineHeight: "30px" }}>
            {idx}
          </h5>
          <motion.img
            key={IconList[randomList[idx]]}
            layoutId={IconList[randomList[idx]]}
            className="size-10"
            src={`/images/task-2/${IconList[randomList[idx]]}`}
          />
        </div>
      ))}
    </div>
  );
}
