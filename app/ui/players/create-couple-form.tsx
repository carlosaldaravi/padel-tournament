"use client";

import Link from "next/link";
import { SubmitButton } from "../submit-button";
import { addCoupleToTournament } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { PlayerType } from "@/app/lib/definitions";
import { useState } from "react";

export default function CreateCoupleForm({
  tournamentId,
  categoryId,
  players,
}: {
  tournamentId: string;
  categoryId: string;
  players: PlayerType[];
}) {
  const [player2Value, setPlayer2Value] = useState("");
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addCoupleToTournament, initialState);

  const selectCoupleHandler = (playerId: string) => {
    console.log("playerId:", playerId);

    const selectedPlayer = players.find((p) => p.id === playerId);
    setPlayer2Value(selectedPlayer?.couple?.id ?? "");
  };
  return (
    <form action={dispatch}>
      <input type="hidden" name="tournamentId" value={tournamentId} />
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="player2" value={player2Value} />
      <div>
        <label>Pareja</label>
        <select
          id="player1"
          name="player1"
          className="block w-fit p-2 bg-transparent py-1.5 cursor-pointer text-gray-600 capitalize focus:outline-none sm:text-sm sm:leading-6"
          aria-describedby="player-error"
          onChange={(e) => selectCoupleHandler(e.target.value)}
        >
          <option value="" disabled selected>
            Selecciona pareja
          </option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.firstName} {player.lastName} - {player.couple?.firstName}{" "}
              {player.couple?.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href={`/players`}
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancelar
        </Link>
        <SubmitButton>Crear</SubmitButton>
      </div>
    </form>
  );
}
