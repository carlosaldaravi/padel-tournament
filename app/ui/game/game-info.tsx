import { formatDate } from "@/app/lib/dates";

const GameInfo = ({ court, date }: { court?: string; date?: Date }) => {
  return (
    <div className="w-full border-b flex justify-between gap-4 p-2">
      <span>{court !== "" ? court : "--"}</span>
      <span className="text-end">{date ? formatDate(date) : "--"}</span>
    </div>
  );
};

export default GameInfo;
