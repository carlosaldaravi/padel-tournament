import { getTournament } from "@/app/database/db";
import { TournamentType } from "@/app/lib/definitions";
import Page from "@/app/ui/Page";
import Tournament from "@/app/ui/tournament/tournament";

const TournamentPage = async () => {
  const tournament: TournamentType = await getTournament(
    "97baf7f5-4b6c-4af4-893b-542fddc77ad1"
  );
  return (
    <Page title="Cuadro">
      <Tournament tournament={tournament as TournamentType} />
    </Page>
  );
};

export default TournamentPage;
