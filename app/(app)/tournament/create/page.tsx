"use server";
import { getCategories } from "@/app/database/db";
import Page from "@/app/ui/Page";
import Form from "@/app/ui/tournament/create-form";

const CreateTournamentPage = async () => {
  const categories = await getCategories();

  return (
    <Page title="Crea tu torneo">
      <Form categories={categories} />
    </Page>
  );
};
export default CreateTournamentPage;
