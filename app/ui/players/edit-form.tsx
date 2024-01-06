"use client";

import { SubmitButton } from "../submit-button";
import { CategoryType, PlayerForm } from "@/app/lib/definitions";
import { updatePlayer } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const EditPlayerForm = ({
  player,
  categories,
}: {
  player: PlayerForm;
  categories: CategoryType[];
}) => {
  const initialState = { message: null, errors: {} };
  const updatePlayerWithId = updatePlayer.bind(null, player.id);
  const [state, dispatch] = useFormState(updatePlayerWithId, initialState);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <form action={dispatch}>
      <input type="hidden" id="userId" name="userId" value={player.user.id} />
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-8">
          <div className="w-full sm:flex">
            <div className="flex-grow">
              <h2 className="text-base font-semibold leading-7 text-white">
                Información del jugador
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Completa la información del jugador.
              </p>
            </div>
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      defaultChecked={player.paid}
                      id="paid"
                      name="paid"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="paid" className="font-medium text-white">
                      Pagado
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
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
                  defaultValue={player.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  aria-describedby="firstName-error"
                />
              </div>
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

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Apellido
              </label>
              <div className="mt-2">
                <input
                  defaultValue={player.lastName}
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                  defaultValue={player.user!.email}
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-white"
              >
                Móvil
              </label>
              <div className="mt-2">
                <input
                  defaultValue={player.phone}
                  required
                  type="text"
                  name="phone"
                  id="phone"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              {state.errors?.phone && (
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                  {state.errors.phone.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium leading-6 text-white"
              >
                Categoría
              </label>
              <div className="mt-2">
                <select
                  defaultValue={player.category!.id || ""}
                  id="categoryId"
                  name="categoryId"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                  aria-describedby="categoryId-error"
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((category) => (
                    <option
                      key={`category-id-${category.id}`}
                      value={category.id}
                    >
                      Categoría {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {state.errors?.categoryId && (
              <div id="category-error" aria-live="polite" aria-atomic="true">
                {state.errors.categoryId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}

            <div className="sm:col-span-6 sm:col-start-1">
              <label
                htmlFor="comments"
                className="block text-sm font-medium leading-6 text-white"
              >
                Comentarios
              </label>
              <div className="mt-2">
                <textarea
                  defaultValue={player.comments}
                  name="comments"
                  rows={2}
                  id="comments"
                  className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          className="text-sm font-semibold leading-6 text-white"
          onClick={() => handleGoBack()}
        >
          Cancelar
        </button>
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
};

export default EditPlayerForm;
