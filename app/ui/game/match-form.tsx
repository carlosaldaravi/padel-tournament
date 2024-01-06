"use client";

import { updateMatch } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { MatchType } from "@/app/lib/definitions";
import {
  getDateStringFromTimestamp,
  getTimeStringFromTimestamp,
} from "@/app/lib/dates";
import { SubmitButton } from "../submit-button";

interface MatchFormProps {
  match: MatchType;
}

export default function MatchForm({ match }: MatchFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateMatch, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="matchId" value={match.id} />
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-8">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="court"
                className="block text-sm font-medium leading-6 text-white"
              >
                Pista
              </label>
              <div className="mt-2">
                <input
                  defaultValue={match.court}
                  type="text"
                  name="court"
                  id="court"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="court-error"
                />
              </div>
            </div>
            {match.locals.length === 2 && match.opponents.length === 2 && (
              <>
                <div className="sm:col-span-3 sm:col-start-1">
                  <label
                    htmlFor="result"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Resultado
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={match.result!}
                      type="text"
                      name="result"
                      id="result"
                      className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      aria-describedby="result-error"
                    />
                  </div>
                  {/* {state.errors?.result && (
                <div id="result-error" aria-live="polite" aria-atomic="true">
                  {state.errors.result.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )} */}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="winners"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Ganadores
                  </label>
                  <select
                    defaultValue={match.winners! || ""}
                    id="winners"
                    name="winners"
                    className="block w-full p-2 mt-2 rounded-md border-0 bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    aria-describedby="winners-error"
                  >
                    <option value="">
                      Selecciona ganadores {match.winners}
                    </option>
                    <option value="locals">
                      {`${match.locals[0]} - ${match.locals[1]}`}
                    </option>
                    <option value="opponents">
                      {`${match.opponents[0]} - ${match.opponents[1]}`}
                    </option>
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="mt-2 sm:col-span-3">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-white"
            >
              Fecha
            </label>
            <div className="mt-2 flex gap-2">
              <input
                defaultValue={getDateStringFromTimestamp(match.date)}
                type="date"
                name="date"
                id="date"
                className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                aria-describedby="date-error"
              />
              <input
                defaultValue={getTimeStringFromTimestamp(match.date)}
                type="time"
                name="time"
                id="time"
                className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                aria-describedby="time-error"
              />
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-red-500">{state?.message}</p>
      </div>
      <SubmitButton>Guardar</SubmitButton>
    </form>
  );
}
