import {
  getCategories,
  getPlayersByCategoryWithOutCouple,
} from "@/app/database/db";
import Page from "@/app/ui/Page";
import Form from "@/app/ui/players/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Jugador",
};

export default async function CreatePlayerPage({
  searchParams,
}: {
  searchParams: { categoryId: string };
}) {
  const categories = await getCategories();
  const players = await getPlayersByCategoryWithOutCouple(
    searchParams.categoryId
  );

  return (
    <Page title="Crear jugador">
      <Form
        categories={categories}
        players={players}
        categorySelected={searchParams.categoryId}
      />
    </Page>
  );
}
