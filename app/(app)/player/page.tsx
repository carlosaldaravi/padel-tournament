import Page from "@/app/ui/Page";
import PlayerList from "@/app/components/PlayerList";
import PlayerTable from "@/app/components/PlayerTable";
import { getCategories } from "@/app/database/db";

const Player = async ({
  searchParams,
}: {
  searchParams?: { category: string };
}) => {
  const categories = await getCategories();
  const category = Number(searchParams?.category) || 1;

  return (
    <Page title="Lista de jugadores">
      <PlayerTable categories={categories} categoryIdSelected={category}>
        <PlayerList categoryId={category} />
      </PlayerTable>
    </Page>
  );
};

export default Player;
