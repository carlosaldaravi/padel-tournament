import { MatchType } from "@/app/lib/definitions";
import GameCouple from "./game-couple";
import GameInfo from "./game-info";
import classes from "./game-card.module.css";

const GameCard = ({ match }: { match: MatchType }) => {
  return (
    <div className={`${classes.card} `}>
      <GameInfo court={match.court} date={match.date} />
      <div className="p-2 flex-grow flex flex-col justify-center items-center gap-2">
        <GameCouple
          couple={match.locals}
          areWinners={match.winners === "locals"}
        />
        <div className="font-black text-xl text-yellow-500">{match.result}</div>
        <GameCouple
          couple={match.opponents}
          areWinners={match.winners === "opponents"}
        />
      </div>
    </div>
  );
};

export default GameCard;
