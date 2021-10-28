import { GetterTree } from "vuex";
import { UserState, User, initialUser } from "./userState";
import { RootState } from "../root/state";

export enum UserGettersTypes {
  GET_USER = "GET_USER",
  GET_TOKEN = "GET_TOKEN",
  IS_AUTHENTICATED = "IS_AUTHENTICATED",
}

export type UserGetters = {
  [UserGettersTypes.GET_USER](state: UserState): User | typeof initialUser;
  [UserGettersTypes.IS_AUTHENTICATED](state: UserState): boolean;
  [UserGettersTypes.GET_TOKEN](state: UserState): string | undefined;
};

export const getters: GetterTree<UserState, RootState> & UserGetters = {
  [UserGettersTypes.GET_USER]: (state) => {
    return state.user;
  },
  [UserGettersTypes.IS_AUTHENTICATED]: (state) => {
    return state.isAuthenticated;
  },
  [UserGettersTypes.GET_TOKEN]: (state) => {
    return state.token;
  },
};
