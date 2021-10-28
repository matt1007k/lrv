import { RootState } from "./state";
import { ActionContext, ActionTree } from "vuex";
import { RootMutationsTypes } from "./mutations";

export type RootActionsTypes = {};

type ActionArguments = Omit<ActionContext<RootState, RootState>, "commit"> & {
  commit<K extends keyof RootMutationsTypes>(
    key: K,
    payload?: Parameters<RootMutationsTypes[K]>[1]
  ): ReturnType<RootMutationsTypes[K]>;
};

export const actions: ActionTree<RootState, RootState> & RootActionsTypes = {};
