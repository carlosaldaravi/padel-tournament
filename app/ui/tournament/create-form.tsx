"use client";

import Link from "next/link";
import { SubmitButton } from "../submit-button";
import { createTournament } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { CategoryType, PhaseEnum } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import TogleWithIcon from "../togle-with-icon";

export interface FormCategory {
  id: string;
  enabled?: boolean;
  name?: string;
  initialPhase?: number;
}

export default function Form({ categories }: { categories: CategoryType[] }) {
  const [formData, setFormData] = useState<FormCategory[]>([]);
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTournament, initialState);
  const handleCategorySelected = (formCategory: FormCategory) => {
    setFormData(
      formData.map((item) => {
        if (item.id === formCategory.id) {
          return {
            ...item,
            enabled: formCategory.enabled,
            initialPhase: formCategory.initialPhase,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    setFormData(
      categories.map((c) => {
        return {
          id: c.id,
          name: c.name as string,
          enabled: false,
          initialPhase: 1,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(formData as any);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex justify-center items-center sm:block">
        <div className="p-4 border rounded-xl bg-cyan-500 w-fit min-w-80">
          <fieldset>
            <legend className="text-base text-center font-bold leading-6 text-gray-900">
              Categorías y fases
            </legend>
            <div className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
              {formData.map((category) => (
                <div key={category.id} className="">
                  <input type="hidden" name="categoryId" value={category.id} />
                  <div className="relative flex items-start py-2">
                    <div className="min-w-0 flex-1 text-sm leading-6">
                      <label
                        htmlFor={`category-${category.id}`}
                        className="select-none font-semibold texl-lg text-slate-900"
                      >
                        Categoría {category.name}
                      </label>
                    </div>
                    <div className="ml-3 flex h-6 items-center">
                      <TogleWithIcon
                        onEnable={(isEnabled: boolean) =>
                          handleCategorySelected({
                            ...category,
                            enabled: isEnabled,
                          })
                        }
                      />
                    </div>
                  </div>
                  {category.enabled && (
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="phase"
                        className="block text-sm font-medium leading-6 text-gray-600"
                      >
                        Fase inicial
                      </label>
                      <div>
                        <select
                          id="phase"
                          name="phase"
                          className="block w-fit p-2 bg-transparent py-1.5 cursor-pointer text-gray-600 capitalize focus:outline-none sm:text-sm sm:leading-6"
                          aria-describedby="phase-error"
                          onChange={(e) =>
                            handleCategorySelected({
                              ...category,
                              initialPhase: Number(e.target.value),
                            })
                          }
                        >
                          <option value="" disabled>
                            Selecciona una fase
                          </option>
                          <option className="capitalize text-end" value={1}>
                            {PhaseEnum.FINAL}
                          </option>
                          <option className="capitalize text-end" value={2}>
                            {PhaseEnum.SEMIS}
                          </option>
                          <option className="capitalize text-end" value={4}>
                            {PhaseEnum.QUARTERS}
                          </option>
                          <option className="capitalize text-end" value={8}>
                            {PhaseEnum.EIGHTHS}
                          </option>
                          <option className="capitalize text-end" value={16}>
                            {PhaseEnum.SIXTEENTHS}
                          </option>
                          <option className="capitalize text-end" value={32}>
                            {PhaseEnum.THIRTIETHS}
                          </option>
                        </select>
                      </div>
                      {/* {state.errors?.phase && (
                      <div
                        id="phase-error"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {state.errors.phase.map((error: string) => (
                          <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                        ))}
                      </div>
                    )} */}
                    </div>
                  )}
                  {/* <div className="relative flex items-start py-2">
                    <div className="min-w-0 flex-1 text-sm leading-6">
                      <label
                        htmlFor={`group-category-${category.id}`}
                        className="select-none text-gray-600"
                      >
                        ¿Fase de grupos?
                      </label>
                    </div>
                    <div className="ml-3 flex h-6 items-center">
                      <input
                        id={`group-category-${category.id}`}
                        name={`group-category-${category.id}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          </fieldset>
        </div>
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
