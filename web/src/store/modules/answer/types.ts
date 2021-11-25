import { AnswerState } from "./state";
import { AnswerMutationsTypes } from "./mutations";
import { AnswerGettersTypes } from "./getters";
import { AnswerActionsTypes } from "./actions";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type AnswerStoreModuleTypes<S = AnswerState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof AnswerMutationsTypes,
    P extends Parameters<AnswerMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<AnswerMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof AnswerGettersTypes]: ReturnType<AnswerGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof AnswerActionsTypes>(
    key: K,
    payload?: Parameters<AnswerActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<AnswerActionsTypes[K]>;
};
