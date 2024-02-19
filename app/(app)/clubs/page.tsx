import { getClubs } from "@/app/database/db";
import { ClubType } from "@/app/lib/definitions";
import Page from "@/app/ui/Page";
import SVG from "@/app/ui/svg";

const clubs: ClubType[] = [
  {
    id: "aih9s-asdf2-asdf2-asdfhasdif",
    name: "Natura",
  },
  {
    id: "dfjh7-sdfws-asdf2-khkfdsaiy2",
    name: "Quality",
  },
  {
    id: "a234s-asdf2-hd8d-asdfhasdif",
    name: "360",
  },
];

const ClubPage = async () => {
  // const clubs: ClubType[] = await getClubs();
  return (
    <Page title="Clubs">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Lista de clubs</h3>
        {clubs.map((club) => {
          return (
            <div key={club.id} className="flex items-center gap-2">
              <SVG type="target" size="6" />
              <p>{club.name}</p>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default ClubPage;
