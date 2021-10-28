export type User = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
};

export const initialUser = {
  name: "",
  email: "",
};

export type UserState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
  token?: string;
};

export const userState: UserState = {
  isLoading: false,
  isAuthenticated: false,
  user: initialUser,
  token: "",
};
