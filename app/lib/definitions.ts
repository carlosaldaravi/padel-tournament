export type Club = {
  id: string;
  name: string;
};
export type Category = {
  id: string;
  name?: string;
};
export type CategoryField = {
  id: string;
  name: string;
};

export type Player = {
  id?: string;
  firstName: string;
  lastName: string;
  dateBorn?: Date | null;
  paid: boolean;
  phone: string;
  comments: string;
  user: User;
  category: Category;
};

export type UserCredentials = {
  id: string;
  email: string;
  password: string;
};
export type User = {
  id?: string;
  email: string;
  password?: string;
  admin?: boolean;
};
export type UserForm = {
  id?: string;
  email: string;
  password?: string;
  admin?: boolean;
};

export type PlayerForm = {
  id: string;
  firstName: string;
  lastName: string;
  dateBorn?: Date | null;
  paid: boolean;
  phone: string;
  comments: string;
  user: UserForm;
  category: Category;
};

export type TournamentType = {
  id: string;
  categories: [
    {
      id: string;
      initialPhase: number;
      name?: string;
      stages: [
        {
          id: string;
          phase: number;
          matches: Match[];
        }
      ];
      winners: string[];
    }
  ];
  date?: Date;
  place?: string;
  location?: string;
};

export type Match = {
  id: string | null;
  date: Date | undefined;
  court: string;
  result: string | null;
  locals: string[];
  opponents: string[];
  winners: "locals" | "opponents" | null;
  phase: number | null;
};

export enum StageEnum {
  final = 1,
  semis = 2,
  cuartos = 4,
  octavos = 8,
  dieciseisavos = 16,
  treintaidosavos = 32,
}

export type PhaseType = {
  name: PhaseEnum;
  games: StageEnum;
};

export enum PhaseEnum {
  FINAL = "final",
  SEMIS = "semis",
  QUARTERS = "cuartos",
  EIGHTHS = "octavos",
  SIXTEENTHS = "dieciseisavos",
  THIRTIETHS = "treintaidosavos",
}

export enum PhaseOrder {
  FINAL = 1,
  SEMIS = 2,
  QUARTERS = 3,
  EIGHTHS = 4,
  SIXTEENTHS = 5,
  THIRTIETHS = 6,
}

export const StageValue = {
  1: PhaseEnum.FINAL,
  2: PhaseEnum.SEMIS,
  4: PhaseEnum.QUARTERS,
  8: PhaseEnum.EIGHTHS,
  16: PhaseEnum.SIXTEENTHS,
  32: PhaseEnum.THIRTIETHS,
};

export type ValidStageKey = 1 | 2 | 4 | 8 | 16 | 32;
