import { CommitOptions, DispatchOptions, Store as VuexStore } from "vuex";

import { UserState } from "./userState";
import { UserMutations } from "./userMutation";
import { UserActions } from "./userAction";
import { UserGetters } from "./userGetter";

export type UserStoreModuleTypes<S = UserState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof UserMutations,
    P extends Parameters<UserMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<UserMutations[K]>;
} & {
  dispatch<K extends keyof UserActions>(
    key: K,
    payload?: Parameters<UserActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UserActions[K]>;
} & {
  getters: {
    [K in keyof UserGetters]: ReturnType<UserGetters[K]>;
  };
};
