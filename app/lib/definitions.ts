export type ClubType = {
  id: string;
  name: string;
};
export type CategoryType = {
  id: string;
  name?: string;
};

export type PlayerType = {
  id?: string;
  firstName: string;
  lastName?: string;
  paid: boolean;
  phone: string;
  dateBorn?: Date | null;
  comments?: string;
  user?: UserType;
  category?: CategoryType;
  couple?: PlayerType;
};

export type UserCredentialsType = {
  id: string;
  email: string;
  password: string;
};
export type UserType = {
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
  id?: string;
  firstName?: string;
  lastName?: string;
  dateBorn?: Date | null;
  paid?: boolean;
  phone?: string;
  comments?: string;
  user?: UserForm;
  category?: CategoryType;
  couple?: Partial<PlayerType>;
};

export type StageType = {
  id: string;
  phase: number;
  matches: MatchType[];
};

export type CategoryOfTournamentType = {
  id: string;
  initialPhase: number;
  name?: string;
  stages: StageType[];
  winners: string[];
};

export type TournamentType = {
  id: string;
  categories: CategoryOfTournamentType[];
  startAt?: Date;
  endAt?: Date;
  place?: string;
  location?: string;
};

export enum WinnersEnum {
  LOCALS = "locals",
  OPPONENTS = "opponents",
}

export type MatchType = {
  id: string;
  date: Date | undefined;
  court: string;
  result: string;
  locals: string[];
  opponents: string[];
  winners: WinnersEnum | null;
  phase?: number | null;
};

export enum PhaseEnum {
  FINAL = "final",
  SEMIS = "semis",
  QUARTERS = "cuartos",
  EIGHTHS = "octavos",
  SIXTEENTHS = "dieciseisavos",
  THIRTIETHS = "treintaidosavos",
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
