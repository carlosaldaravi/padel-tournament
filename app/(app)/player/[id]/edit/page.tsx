import Form from "@/app/ui/players/edit-form";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategories, getPlayerById } from "@/app/database/db";
import { PlayerForm } from "@/app/lib/definitions";
import Page from "@/app/ui/Page";

export const metadata: Metadata = {
  title: "Editar Jugador",
};

export default async function EditPlayerPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;
  const [player, categories] = await Promise.all([
    getPlayerById(id),
    getCategories(),
  ]);

  if (!player) {
    notFound();
  }

  return (
    <Page title="Editar jugador">
      <Form player={player as PlayerForm} categories={categories} />
    </Page>
  );
}
