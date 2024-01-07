import { formatDate } from "@/app/lib/dates";
import SVG from "../svg";

const GameInfo = ({ court, date }: { court?: string; date?: Date }) => {
  return (
    <div className="w-full border-b flex justify-between gap-4 p-2">
      <span className="flex gap-1 lg:gap-2 items-center">
        <SVG type="court" size="6" /> {court !== "" ? court : "--"}
      </span>
      <span className="text-end">{date ? formatDate(date) : "--"}</span>
    </div>
  );
};

export default GameInfo;
