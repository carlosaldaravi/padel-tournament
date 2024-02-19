import Page from "@/app/ui/Page";
import PlayerList from "@/app/components/PlayerList";
import PlayerTable from "@/app/components/PlayerTable";
import {
  getCategories,
  getCategoriesLevels,
  getLevels,
} from "@/app/database/db";

const Player = async ({
  searchParams,
}: {
  searchParams?: { categoryId: string; levelId: string };
}) => {
  const categories = await getCategories();
  const levels = await getLevels();
  const cLevels = await getCategoriesLevels();
  console.log("cLevels: ", cLevels);

  const category = searchParams?.categoryId || categories[0].id;
  const level = searchParams?.levelId || levels[0].id;

  return (
    <Page title="Lista de jugadores">
      <PlayerTable
        categories={categories}
        levels={levels}
        categoryIdSelected={category}
        levelIdSelected={level}
      >
        <PlayerList categoryId={category} />
      </PlayerTable>
    </Page>
  );
};

export default Player;
