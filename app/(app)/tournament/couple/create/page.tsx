import { getPlayersByCategory } from "@/app/database/db";
import Page from "@/app/ui/Page";
import CreateCoupleForm from "@/app/ui/players/create-couple-form";

const CreateTournamentCouple = async ({
  searchParams,
}: {
  searchParams: { tournamentId: string; categoryId: string };
}) => {
  const players = await getPlayersByCategory(searchParams.categoryId);

  return (
    <Page title="Añadir pareja">
      <CreateCoupleForm players={players} />
    </Page>
  );
};

export default CreateTournamentCouple;
