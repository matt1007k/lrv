import { RootState } from "./state";
import { RootMutationsTypes } from "./mutations";
import { RootGettersTypes } from "./getters";
import { RootActionsTypes } from "./actions";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type RootStoreModuleTypes<S = RootState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof RootMutationsTypes,
    P extends Parameters<RootMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<RootMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof RootGettersTypes]: ReturnType<RootGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof RootActionsTypes>(
    key: K,
    payload?: Parameters<RootActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<RootActionsTypes[K]>;
};
