import { Suspense } from "react";
import { getPlayersByCategory } from "../database/db";
import { DeletePlayer, UpdatePlayer } from "@/app/ui/players/buttons";
import PlayerListSkeleton from "./PlayerListSkeleton";

const PlayerList = async ({ categoryId }: { categoryId: number }) => {
  const players = await getPlayersByCategory(categoryId);

  return (
    <Suspense
      key={`players-category-${categoryId}`}
      fallback={<PlayerListSkeleton />}
    >
      {players.map((player) => (
        <tr key={player.id}>
          <td className="whitespace-nowrap py-5 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="">
                <div className="font-medium text-white">
                  {player.firstName} {player.lastName}
                </div>
                <div className="mt-1 text-gray-500">{player.user.email}</div>
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
            <div className="text-white">{player.phone}</div>
          </td>
          <td className="whitespace-nowrap px-2 py-5 text-sm text-gray-500">
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {player.paid ? "Pagado" : "No pagado"}
            </span>
          </td>
          <td className="w-22 flex justify-end gap-1 whitespace-nowrap py-5 text-sm font-medium sm:pr-0">
            <UpdatePlayer id={player.id || 0} />
            <DeletePlayer id={player.user.id || 0} />
          </td>
        </tr>
      ))}
    </Suspense>
  );
};

export default PlayerList;
