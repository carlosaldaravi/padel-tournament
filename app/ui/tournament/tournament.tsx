import { TournamentType } from "@/app/lib/definitions";
import Stage from "../game/game-stage";
import CategoryTournamentSelect from "./category-select";
import Link from "next/link";
import Modal from "../modal";
import CreateCoupleForm from "@/app/ui/players/create-couple-form";
import { getPlayersByCategory } from "@/app/database/db";
import { Button } from "../button";
import SVG from "../svg";

const Tournament = async ({
  tournament,
  categoryId,
}: {
  tournament: TournamentType;
  categoryId: string;
}) => {
  const players = await getPlayersByCategory(categoryId);
  return (
    <div className="mx-12 h-full w-full">
      <div className="flex items-center gap-4">
        <CategoryTournamentSelect
          catSelected={categoryId}
          tournament={tournament}
        />
        {/* <Link
          href={`/tournament/couple/create?tournamentId=${tournament.id}&categoryId=${categoryId}`}
          className="flex justify-center items-center h-8 rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-blue-600"
        >
          Añadir pareja
        </Link> */}
        {/* <Modal show={true}>
          <CreateCoupleForm
            tournamentId={tournament.id}
            categoryId={categoryId}
            players={players}
          />
        </Modal> */}
      </div>
      <div className="h-full w-full p-4 snap-x flex items-start gap-16">
        {/* TODO: only show to admin */}
        {players.length > 0 && (
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-2">
              <p className="mb-2 text-lg">Parejas sin cuadro</p>
              {players.map((player) => {
                return (
                  <li key={player.id} className="flex gap-2 items-center">
                    <SVG type="couple" size="6" />
                    <p className="italic font-thin">
                      {player.firstName} {player.lastName} -{" "}
                      {player.couple?.firstName} {player.couple?.lastName}
                    </p>
                  </li>
                );
              })}
            </ul>
            <Button>Añadir al cuadro</Button>
          </div>
        )}
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
