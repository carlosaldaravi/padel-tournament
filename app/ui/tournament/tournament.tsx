import { TournamentType } from "@/app/lib/definitions";
import Stage from "../game/game-stage";
import CategoryTournamentSelect from "./category-select";
import { getCouplesByCategory } from "@/app/database/db";
import CouplesNotAssign from "./couples-not-assign";

const Tournament = async ({
  tournament,
  categoryId,
}: {
  tournament: TournamentType;
  categoryId: string;
}) => {
  const players = await getCouplesByCategory(categoryId);

  return (
    <div className="mx-12 h-full w-full">
      <div className="flex items-center gap-4">
        <CategoryTournamentSelect
          catSelected={categoryId}
          tournament={tournament}
        />
      </div>
      <div className="h-full w-full p-4 snap-x flex items-start gap-16">
        {/* TODO: only show to admin */}
        <CouplesNotAssign
          tournamentId={tournament.id}
          categoryId={categoryId}
          players={players}
        />
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
