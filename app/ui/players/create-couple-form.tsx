"use client";

import Link from "next/link";
import { SubmitButton } from "../submit-button";
import { addCoupleToTournament } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { PlayerType } from "@/app/lib/definitions";

export default function CreateCoupleForm({
  players,
}: {
  players: PlayerType[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addCoupleToTournament, initialState);

  return (
    <form action={dispatch}>
      <div>
        <label>Nombre 1</label>
        <select
          id="player1"
          name="player1"
          className="block w-fit p-2 bg-transparent py-1.5 cursor-pointer text-gray-600 capitalize focus:outline-none sm:text-sm sm:leading-6"
          aria-describedby="player-error"
        >
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.firstName} {player.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Nombre 2</label>
        <select
          id="player2"
          name="player2"
          className="block w-fit p-2 bg-transparent py-1.5 cursor-pointer text-gray-600 capitalize focus:outline-none sm:text-sm sm:leading-6"
          aria-describedby="player-error"
        >
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.firstName} {player.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href={`/player`}
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancelar
        </Link>
        <SubmitButton>Crear</SubmitButton>
      </div>
    </form>
  );
}
