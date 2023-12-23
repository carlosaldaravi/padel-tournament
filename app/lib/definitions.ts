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

export type Game = {
  id: string;
  date: Date;
  court: string;
  result: string | null;
  locals: string[];
  opponents: string[];
  winners: "locals" | "opponents" | null;
};

export enum StageEnum {
  FINAL = "1",
  SEMIS = "2",
  QUARTERS = "4",
  EIGHTHS = "8",
  SIXTEENTHS = "16",
  THIRTIETHS = "32",
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
