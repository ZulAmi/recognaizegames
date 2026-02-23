import { twMerge } from "tailwind-merge";

const gradients: Record<string, string> = {
  default:
    "radial-gradient(108.21% 50% at 50% 50%, rgba(228, 227, 255, 0.4) 0%, rgba(141, 231, 244, 0.4) 100%), #FFFFFF",
  task2: "radial-gradient(108.21% 50% at 50% 50%, rgba(228, 227, 255, 0.4) 0%, rgba(214, 141, 232, 0.4) 100%), #FFFFFF",
  task3: "radial-gradient(108.21% 50% at 50% 50%, rgba(200, 248, 216, 0.4) 0%, rgba(68, 234, 124, 0.4) 100%), #FFFFFF",
  task4: "radial-gradient(108.21% 50% at 50% 50%, rgba(175, 205, 250, 0.4) 0%, rgba(61, 136, 253, 0.4) 100%), #FFFFFF",
  task5: "radial-gradient(108.21% 50% at 50% 50%, rgba(242, 211, 191, 0.4) 0%, rgba(254, 142, 68, 0.4) 100%), #FFFFFF",
};

export function Background({
  children,
  className,
  gradient = "default",
}: React.HTMLAttributes<HTMLDivElement> & { gradient?: string }) {
  return (
    <div
      className={"full overflow-y-auto fc"}
      style={{
        background: gradients[gradient],
      }}
    >
      <div className={twMerge("flex-1 fc max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto", className)}>
        {children}
      </div>
    </div>
  );
}
