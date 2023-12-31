import { getCouplesByCategory } from "@/app/database/db";
import Page from "@/app/ui/Page";
import CreateCoupleForm from "@/app/ui/players/create-couple-form";

const CreateTournamentCouple = async ({
  searchParams,
}: {
  searchParams: { tournamentId: string; categoryId: string };
}) => {
  const players = await getCouplesByCategory(searchParams.categoryId);

  return (
    <Page title="Añadir pareja">
      <CreateCoupleForm
        tournamentId={searchParams.tournamentId}
        categoryId={searchParams.categoryId}
        players={players}
      />
    </Page>
  );
};

export default CreateTournamentCouple;
