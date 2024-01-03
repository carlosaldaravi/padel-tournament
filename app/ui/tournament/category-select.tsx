"use client";
import { TournamentType } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const CategoryTournamentSelect = ({
  catSelected = "",
  tournament,
}: {
  catSelected: string;
  tournament: TournamentType;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (categoryIdSelected: string) => {
    router.replace(
      `${pathname}?tournamentId=${tournament.id}&categoryId=${categoryIdSelected}`
    );
  };

  return (
    <div className="">
      <select
        defaultValue={catSelected}
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
  );
};

export default CategoryTournamentSelect;
