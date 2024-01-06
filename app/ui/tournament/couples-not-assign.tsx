"use client";
import { PlayerType } from "@/app/lib/definitions";
import SVG from "../svg";
import { Button } from "../button";
import { assignCoupleToTournament } from "@/app/lib/actions";

interface CouplesNotAssignProps {
  tournamentId: string;
  categoryId: string;
  players: PlayerType[];
}

const CouplesNotAssign = ({
  tournamentId,
  categoryId,
  players,
}: CouplesNotAssignProps) => {
  const assignCouples = () => {
    assignCoupleToTournament(tournamentId, categoryId, players);
  };
  return (
    <>
      {players.length > 0 && (
        <div className="flex flex-col gap-8 min-w-72">
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
          <Button onClick={() => assignCouples()}>Añadir al cuadro</Button>
        </div>
      )}
    </>
  );
};

export default CouplesNotAssign;
