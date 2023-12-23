import { formatDate } from "@/app/lib/dates";

const GameInfo = ({ court, date }: { court: string; date: Date }) => {
  return (
    <div className="border-b flex justify-between gap-4 p-2">
      <span>{court}</span>
      <span className="text-end">{formatDate(date)}</span>
    </div>
  );
};

export default GameInfo;
