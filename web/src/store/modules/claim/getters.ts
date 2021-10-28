import { GetterTree } from "vuex";
import { ClaimState, Claim } from "./state";

import { RootState } from "../root/state";
import { PaginationLinksType } from "../../types";

export enum ClaimGetterType {
  GET_ALL = "GET_ALL",
  GET_LINKS = "GET_LINKS",
}

export type ClaimGettersTypes = {
  [ClaimGetterType.GET_ALL](state: ClaimState): Claim[];
  [ClaimGetterType.GET_LINKS](state: ClaimState): PaginationLinksType;
};

export const getters: GetterTree<ClaimState, RootState> & ClaimGettersTypes = {
  [ClaimGetterType.GET_ALL]: (state: ClaimState) => {
    return state.claims;
  },
  [ClaimGetterType.GET_LINKS]: (state: ClaimState) => {
    return state.links;
  },
};
