import { Game, StageEnum, PhaseEnum } from "@/app/lib/definitions";
import Page from "@/app/ui/Page";
import Stage from "@/app/ui/game/game-stage";

const cuadro = {
  dieciseisavos: {
    numOfGames: StageEnum.SIXTEENTHS,
    round: "1",
    games: [
      {
        id: "gdg3-hfbd-fcax-gs33",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 6-3",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "werw-rt4w-5rfw-y4fe",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "tert-ggee-gsd4-gre4",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "tryh-thr4-jty4-dfwe",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "jtyf-9fj-kyu6-qwer",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "lui7-asd2-sdfw-iuol",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "g3fa-ffws-f32f-gy5y",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "afs2-xcxz-f3fs-vfr4",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "2-6 / 1-6",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "fgwt-5rdx-dfsc-qwer",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "asdf-iuuy-reqw-hgju",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "weqq-eert-reqw-dsss",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-1 / 6-2",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "ffww-fasd3-ufn3-adf3",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "rwey-f32d-vcvs-qwer",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "fwee-asd2-sdfw-heds",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "jkee-adf3-df2d-f3fs",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "fh6y-f32f-rt3d-fas3",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "3-6 / 6-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
    ] as Game[],
  },
  octavos: {
    numOfGames: StageEnum.EIGHTHS,
    round: "2",
    games: [
      {
        id: "fffs-fd3d-sdf2-qwer",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 2-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "asdf-fdsa-reqw-qwer",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "4-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "faff-fdsa-reqw-dsss",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-4 / 6-4",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "fdds-fdsa-ufn3-qwer",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "fasd-9fj-reqw-qwer",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "asdd-asd2-sdfw-gh4d",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "jkee-ffws-reqw-f3fs",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 6-4",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "afs2-f32f-f3fs-fas3",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
    ] as Game[],
  },
  cuartos: {
    numOfGames: StageEnum.QUARTERS,
    round: "3",
    games: [
      {
        id: "24fs-234d-sd34-afw3",
        court: "Pista 1",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "4gfw-4dsw-serf-gasd",
        court: "Pista 2",
        date: new Date("12/23/2023 17:00"),
        result: "6-3 / 2-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
      {
        id: "ertd-hrth-dfvd-ertf",
        court: "Pista 3",
        date: new Date("12/23/2023 17:00"),
        result: "6-2 / 4-6 / 7-6",
        locals: ["Carlos Aldaravi", "Alfonso Molina"],
        opponents: ["Christian Blasco", "Alejandro Mirete"],
        winners: "locals",
      },
      {
        id: "gsdr-sdfg-asdf-ndff",
        court: "Pista 4",
        date: new Date("12/23/2023 17:00"),
        result: "0-6 / 5-7",
        locals: ["Arturo Coello", "Agustín Tapia"],
        opponents: ["Alejandro Galán", "Juan Lebrón"],
        winners: "opponents",
      },
    ] as Game[],
  },
  semis: {
    numOfGames: StageEnum.SEMIS,
    round: "4",
    games: [
      {
        id: "asqs-ffee-vbbs-bnrd",
        court: "Pista 5",
        date: new Date("12/23/2023 17:00"),
        result: "",
        locals: [],
        opponents: [],
        winners: null,
      },
      {
        id: "aadd-gadv-hwsd-jwid",
        court: "Pista 6",
        date: new Date("12/23/2023 17:00"),
        result: "",
        locals: [],
        opponents: [],
        winners: null,
      },
    ] as Game[],
  },
  final: {
    numOfGames: StageEnum.FINAL,
    round: "5",
    games: [
      {
        id: "rcsw-fdsa-gecs-2dfa",
        court: "Pista 7",
        date: new Date("12/25/2023 20:00"),
        result: "",
        locals: [],
        opponents: [],
        winners: null,
      },
    ] as Game[],
  },
};

const GamePage = () => {
  return (
    <Page title="Cuadro">
      <div className="h-full w-full p-4 snap-x flex items-center gap-16">
        {cuadro.dieciseisavos.games.length > 0 && (
          <Stage
            games={cuadro.dieciseisavos.games}
            round={cuadro.dieciseisavos.round}
            phase={{
              name: PhaseEnum.SIXTEENTHS,
              games: cuadro.dieciseisavos.numOfGames,
            }}
          />
        )}
        {cuadro.octavos.games.length > 0 && (
          <Stage
            games={cuadro.octavos.games}
            round={cuadro.octavos.round}
            phase={{
              name: PhaseEnum.EIGHTHS,
              games: cuadro.octavos.numOfGames,
            }}
          />
        )}
        {cuadro.cuartos.games.length > 0 && (
          <Stage
            games={cuadro.cuartos.games}
            round={cuadro.cuartos.round}
            phase={{
              name: PhaseEnum.QUARTERS,
              games: cuadro.cuartos.numOfGames,
            }}
          />
        )}
        {cuadro.semis.games.length > 0 && (
          <Stage
            games={cuadro.semis.games}
            round={cuadro.semis.round}
            phase={{
              name: PhaseEnum.SEMIS,
              games: cuadro.semis.numOfGames,
            }}
          />
        )}
        {cuadro.final.games.length > 0 && (
          <Stage
            games={cuadro.final.games}
            round={cuadro.final.round}
            phase={{
              name: PhaseEnum.FINAL,
              games: cuadro.final.numOfGames,
            }}
          />
        )}
      </div>
    </Page>
  );
};

export default GamePage;
