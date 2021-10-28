import { ActionContext, ActionTree } from "vuex";

import { Claim, ClaimState } from "./state";
import { RootState } from "../root/state";

import { ClaimMutationsTypes, ClaimMutationType } from "./mutations";

import { PaginationLinksType } from "../../types";

export enum ClaimActionType {
  SET_ALL = "SET_ALL",
}
export type ClaimActionsTypes = {
  [ClaimActionType.SET_ALL](
    { commit }: ActionArguments,
    payload: { data: Claim[]; links: PaginationLinksType }
  ): void;
};

type ActionArguments = Omit<ActionContext<ClaimState, RootState>, "commit"> & {
  commit<K extends keyof ClaimMutationsTypes>(
    key: K,
    payload?: Parameters<ClaimMutationsTypes[K]>[1]
  ): ReturnType<ClaimMutationsTypes[K]>;
};

export const actions: ActionTree<ClaimState, RootState> & ClaimActionsTypes = {
  [ClaimActionType.SET_ALL]({ commit }, payload) {
    commit(ClaimMutationType.SET_CLAIMS, payload.data);
    commit(ClaimMutationType.SET_LINKS, payload.links);
  },
};
