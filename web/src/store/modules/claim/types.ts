import { ClaimState } from "./state";
import { ClaimMutationsTypes } from "./mutations";
import { ClaimGettersTypes } from "./getters";
import { ClaimActionsTypes } from "./actions";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type ClaimStoreModuleTypes<S = ClaimState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof ClaimMutationsTypes,
    P extends Parameters<ClaimMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<ClaimMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof ClaimGettersTypes]: ReturnType<ClaimGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof ClaimActionsTypes>(
    key: K,
    payload?: Parameters<ClaimActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ClaimActionsTypes[K]>;
};
