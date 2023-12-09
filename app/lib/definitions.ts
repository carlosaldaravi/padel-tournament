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
