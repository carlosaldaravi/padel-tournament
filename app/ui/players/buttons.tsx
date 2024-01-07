import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deletePlayer } from "@/app/lib/actions";

export function CreatePlayer({
  categoryIdSelected,
}: {
  categoryIdSelected: string;
}) {
  return (
    <Link
      href={`/players/create?categoryId=${categoryIdSelected}`}
      className="flex justify-center h-10 items-center rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      Crear jugador
    </Link>
  );
}

export function UpdatePlayer({ id }: { id: string }) {
  return (
    <Link
      href={`/players/${id}/edit`}
      className="w-10 flex justify-center rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePlayer({ id }: { id: string }) {
  const deletePlayerWithId = deletePlayer.bind(null, id);

  return (
    <form action={deletePlayerWithId}>
      <button className="w-10 flex justify-center rounded-md border p-2 border-red-500 hover:bg-red-300">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5 text-red-500" />
      </button>
    </form>
  );
}
