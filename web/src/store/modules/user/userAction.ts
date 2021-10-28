import { ActionContext, ActionTree } from "vuex";
import { UserMutations, UserMutationType } from "./userMutation";
import { UserState } from "./userState";
import { RootState } from "../root/state";

export enum UserActionTypes {
  GET_USER = "GET_USER",
  TEST_USER = "TEST_USER",
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
}

type ActionArguments = Omit<ActionContext<UserState, RootState>, "commit"> & {
  commit<K extends keyof UserMutations>(
    key: K,
    payload?: Parameters<UserMutations[K]>[1]
  ): ReturnType<UserMutations[K]>;
};

export type UserActions = {
  [UserActionTypes.GET_USER]({ commit }: ActionArguments): void;
  [UserActionTypes.TEST_USER](
    { commit }: ActionArguments,
    payload: boolean
  ): void;
  [UserActionTypes.LOG_IN](
    { commit }: ActionArguments,
    payload: UserState
  ): void;
  [UserActionTypes.LOG_OUT]({ commit }: ActionArguments): void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userActions: ActionTree<UserState, RootState> & UserActions = {
  [UserActionTypes.GET_USER]({ commit }) {
    commit(UserMutationType.SetLogging, true);

    // await logginUser()
    // await sleep(1000);

    commit(UserMutationType.SetLogging, false);
    commit(UserMutationType.CreateUser, {
      id: 1,
      name: "ma deza",
      email: "matt1k@gmail.com",
    });
  },
  [UserActionTypes.TEST_USER]({ commit }, payload: boolean) {
    commit(UserMutationType.SetLogging, payload);
    commit(UserMutationType.REMOVE_TOKEN);
  },
  [UserActionTypes.LOG_IN]({ commit }, { user, token }: UserState) {
    commit(UserMutationType.SetLogging, true);
    commit(UserMutationType.CreateUser, user);
    commit(UserMutationType.SET_TOKEN, token);
    if (token) localStorage.setItem("token", token);
    commit(UserMutationType.SetLogging, false);
  },
  [UserActionTypes.LOG_OUT]({ commit }) {
    commit(UserMutationType.DeleteUser);
    commit(UserMutationType.REMOVE_TOKEN);
    localStorage.removeItem("token");
  },
};
