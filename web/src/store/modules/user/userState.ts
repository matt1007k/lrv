export type User = {
  id?: number;
  name: string;
  email: string;
  role: string | "ADMIN" | "USER";
  password?: string;
  confirm_password?: string;
};

export const initialUser = {
  name: "",
  email: "",
  role: "USER",
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
