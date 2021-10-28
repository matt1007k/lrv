import { MutationTree } from "vuex";
import { User, UserState, initialUser } from "./userState";

export enum UserMutationType {
  CreateUser = "CREATE_USER",
  DeleteUser = "DELETE_USER",
  SetLogging = "SET_LOGGING",
  INITIALIZE_STORE = "INITIALIZE_STORE",
  SET_TOKEN = "SET_TOKEN",
  REMOVE_TOKEN = "REMOVE_TOKEN",
}

export type UserMutations = {
  [UserMutationType.CreateUser](state: UserState, user: User): void;
  [UserMutationType.DeleteUser](state: UserState): void;
  [UserMutationType.SetLogging](state: UserState, value: boolean): void;
  [UserMutationType.INITIALIZE_STORE](state: UserState): void;
  [UserMutationType.SET_TOKEN](state: UserState, token: string): void;
  [UserMutationType.REMOVE_TOKEN](state: UserState): void;
};

export const userMutations: MutationTree<UserState> & UserMutations = {
  [UserMutationType.CreateUser](state, user) {
    state.user = user;
  },
  [UserMutationType.DeleteUser](state) {
    state.user = initialUser;
  },
  [UserMutationType.SetLogging](state, value) {
    state.isLoading = value;
  },
  [UserMutationType.INITIALIZE_STORE](state) {
    if (localStorage.getItem("token")) {
      state.token = localStorage.getItem("token")?.toString();
      state.isAuthenticated = true;
    } else {
      state.token = "";
      state.isAuthenticated = false;
    }
  },
  [UserMutationType.SET_TOKEN](state, token) {
    state.token = token;
    state.isAuthenticated = true;
  },
  [UserMutationType.REMOVE_TOKEN](state) {
    state.token = "";
    state.isAuthenticated = false;
  },
};
