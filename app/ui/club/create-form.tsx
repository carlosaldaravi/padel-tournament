"use client";

import Link from "next/link";
import { SubmitButton } from "../submit-button";
import { createUserWithClub } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function CreateClubForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUserWithClub, initialState);

  return (
    <form action={dispatch}>
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-8">
          <div className="w-full sm:flex">
            <div className="flex-grow">
              <h2 className="text-base font-semibold leading-7 text-white">
                Registra tu club
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Completa la información de tu usuario y tu club.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="firstName-error"
                />
              </div>
              {state.errors?.firstName && (
                <div id="firstName-error" aria-live="polite" aria-atomic="true">
                  {state.errors.firstName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Apellido
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="lastName-error"
                />
              </div>
              {state.errors?.lastName && (
                <div id="lastName-error" aria-live="polite" aria-atomic="true">
                  {state.errors.lastName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="email-error"
                />
              </div>
              {state.errors?.email && (
                <div id="email-error" aria-live="polite" aria-atomic="true">
                  {state.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="club"
                className="block text-sm font-medium leading-6 text-white"
              >
                Nombre del club
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="club"
                  id="club"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="club-error"
                />
              </div>
              {/* {state.errors?.club && (
                <div id="club-error" aria-live="polite" aria-atomic="true">
                  {state.errors.club.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )} */}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="password-error"
                />
              </div>
              {/* {state.errors?.password && (
                <div id="password-error" aria-live="polite" aria-atomic="true">
                  {state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )} */}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="password2"
                className="block text-sm font-medium leading-6 text-white"
              >
                Repite la contraseña
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="password2-error"
                />
              </div>
              {/* {state.errors?.password2 && (
                <div id="password2-error" aria-live="polite" aria-atomic="true">
                  {state.errors.password2.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-red-500">{state?.message}</p>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href={`/`} className="text-sm font-semibold leading-6 text-white">
          Volver
        </Link>
        <SubmitButton>Crear</SubmitButton>
      </div>
    </form>
  );
}
