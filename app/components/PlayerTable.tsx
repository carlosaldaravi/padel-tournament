"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { CategoryType } from "@/app/lib/definitions";
import { CreatePlayer } from "../ui/players/buttons";

const PlayerTable = ({
  categoryIdSelected,
  categories,
  children,
}: {
  categoryIdSelected: string;
  categories: CategoryType[];
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategorySelected = (value: string) => {
    router.replace(`${pathname}?category=${value}`);
  };
  return (
    <div className="sm:min-w-[32rem]">
      <div className="sm:flex sm:items-center">
        <div className="w-full sm:flex">
          <div className="flex-grow">
            <h1 className="text-base font-semibold leading-6 text-white">
              Jugadores
            </h1>
            <p className="text-sm text-gray-700">
              Lista de jugadores por categoría
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0">
            <CreatePlayer categoryIdSelected={categoryIdSelected} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <select
          defaultValue={categoryIdSelected}
          onChange={(e) => handleCategorySelected(e.target.value)}
          required
          id="category"
          name="category"
          autoComplete="category-name"
          className="block w-full p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {categories.map((category) => (
            <option key={`category-id-${category.id}`} value={category.id}>
              Categoría {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 text-left text-lg font-semibold text-white"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-left text-lg font-semibold text-white"
                  >
                    Teléfono
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3.5 text-left text-lg font-semibold text-white"
                  >
                    Estado
                  </th>
                  <th scope="col" className="w-22 py-3.5">
                    <span className="sr-only">Editar</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerTable;
