import { TournamentType } from "@/app/lib/definitions";
import Stage from "../game/game-stage";
import CategoryTournamentSelect from "./category-select";
import Link from "next/link";

const Tournament = ({
  tournament,
  categoryId,
}: {
  tournament: TournamentType;
  categoryId: string;
}) => {
  return (
    <div className="mx-12 h-full w-full">
      <CategoryTournamentSelect
        catSelected={categoryId}
        tournament={tournament}
      />
      <Link
        href={`/tournament/couple/create?tournamentId=${tournament.id}&categoryId=${categoryId}`}
        className="flex justify-center h-10 items-center rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Añadir pareja
      </Link>
      <div className="h-full w-full p-4 snap-x flex items-center gap-16">
        {tournament.categories
          .find((c) => c.id === categoryId)
          ?.stages.map((stage, index) => (
            <Stage
              key={stage.id}
              matches={stage.matches}
              round={(index + 1).toString()}
              phase={stage.phase}
            />
          ))}
      </div>
    </div>
  );
};

export default Tournament;
