import Link from "next/link";
import Page from "./ui/Page";
import { getClub } from "./database/db";
import { ClubType } from "./lib/definitions";

export default async function Home() {
  const club: ClubType = await getClub();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Page title={`Bienvenido a ${club.name}`}>
        <Link href={`/players?categoryId=d38d958f-ab84-481d-9e8e-2c4f36cce724`}>
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center
                text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lista de jugadores
          </button>
          <span className="sr-only">lista de jugadores</span>
        </Link>
      </Page>
    </main>
  );
}
