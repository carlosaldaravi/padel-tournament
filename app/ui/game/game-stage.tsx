import { MatchType, StageValue, ValidStageKey } from "@/app/lib/definitions";
import GameCard from "./game-card";
import classes from "./game-card.module.css";

const Stage = ({
  matches,
  phase,
  round,
}: {
  matches: MatchType[];
  phase: number;
  round: string;
}) => {
  return (
    <div className="h-full snap-center relative">
      <h2 className="w-full text-xl font-bold text-center top-0 absolute mx-auto capitalize">
        {StageValue[phase as ValidStageKey]}
      </h2>
      <div
        className={`h-full flex flex-col justify-around mt-12 ${
          classes["round" + round]
        }`}
      >
        {matches.map((match) => (
          <GameCard key={match.id} match={match as MatchType} />
        ))}
      </div>
    </div>
  );
};

export default Stage;
