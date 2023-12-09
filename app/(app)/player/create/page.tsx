import { getCategories } from "@/app/database/db";
import Page from "@/app/ui/Page";
import Form from "@/app/ui/players/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Jugador",
};

export default async function CreatePlayerPage() {
  const categories = await getCategories();

  return (
    <Page title="Crear jugador">
      <Form categories={categories} />
    </Page>
  );
}
