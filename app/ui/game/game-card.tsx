import { Game } from "@/app/lib/definitions";
import GameCouple from "./game-couple";
import GameInfo from "./game-info";
import classes from "./game-card.module.css";

const GameCard = ({ game }: { game: Game }) => {
  return (
    <div className={`${classes.card} `}>
      <GameInfo court={game.court} date={game.date} />
      <div className="p-2 flex-grow flex flex-col justify-center items-center gap-2">
        <GameCouple
          couple={game.locals}
          areWinners={game.winners === "locals"}
        />
        <div className="font-black text-xl text-yellow-500">{game.result}</div>
        <GameCouple
          couple={game.opponents}
          areWinners={game.winners === "opponents"}
        />
      </div>
    </div>
  );
};

export default GameCard;
