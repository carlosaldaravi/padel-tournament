"use client";

import { TournamentType } from "@/app/lib/definitions";
import Stage from "../game/game-stage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// const categories = [
//   {
//     id: "90c71815-726a-43c1-a8c5-1533968db820",
//     name: "1",
//   },
//   {
//     id: "9042abcf-d5ea-4344-9c59-e6a107f5506d",
//     name: "2",
//   },
//   {
//     id: "811cca57-6d97-4f7c-9d58-be76ec6767f9",
//     name: "3",
//   },
//   {
//     id: "1624a9ad-581e-4b37-b06e-56ef279c0419",
//     name: "4",
//   },
//   {
//     id: "d38d958f-ab84-481d-9e8e-2c4f36cce724",
//     name: "5",
//   },
// ];

const Tournament = ({ tournament }: { tournament: TournamentType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let categoryId = searchParams.get("categoryId") || "";

  const handleCategoryChange = (categoryIdSelected: string) => {
    router.replace(`${pathname}?categoryId=${categoryIdSelected}`);
  };

  return (
    <div className="mx-12 h-full w-full">
      <div className="mt-2">
        <select
          defaultValue={categoryId}
          id="categoryId"
          name="categoryId"
          className="block w-fit p-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
          aria-describedby="categoryId-error"
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {tournament.categories.map((category) => (
            <option key={`category-id-${category.id}`} value={category.id}>
              Categoría {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="h-full w-full p-4 snap-x flex items-center gap-16">
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
