import { getTournament } from "@/app/database/db";
import { TournamentType } from "@/app/lib/definitions";
import Page from "@/app/ui/Page";
import Tournament from "@/app/ui/tournament/tournament";
import { Suspense } from "react";

const TournamentPage = async ({
  searchParams,
}: {
  searchParams: { tournamentId: string; categoryId: string };
}) => {
  const tournament: TournamentType = await getTournament(
    searchParams.tournamentId
  );

  return (
    <Page title="Cuadro">
      <Suspense
        key={`tournament-${searchParams.tournamentId}`}
        fallback={<p>Cargando...</p>}
      >
        {/* {tournament && ( */}
        <Tournament
          tournament={tournament}
          categoryId={searchParams.categoryId}
        />
        {/* )} */}
      </Suspense>
    </Page>
  );
};

export default TournamentPage;
