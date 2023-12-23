import { Game, PhaseType } from "@/app/lib/definitions";
import GameCard from "./game-card";
import classes from "./game-card.module.css";

const Stage = ({
  games,
  phase,
  round,
}: {
  games: Game[];
  phase: PhaseType;
  round: string;
}) => {
  const roundClass = "round" + round;
  return (
    <div className="h-full snap-center relative">
      <h2 className="w-full text-xl font-bold text-center top-0 absolute mx-auto capitalize">
        {phase.name}
      </h2>
      <div
        className={`h-full flex flex-col justify-around mt-12 ${
          classes.cardContainer
        } ${classes["round" + round]}`}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game as Game} />
        ))}
      </div>
    </div>
  );
};

export default Stage;
