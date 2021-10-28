import { PaginationLinksType } from "../../types";
import { MutationTree } from "vuex";
import { ClaimState, Claim } from "./state";

export enum ClaimMutationType {
  SET_CLAIMS = "SET_CLAIMS",
  SET_LINKS = "SET_LINKS",
}

export type ClaimMutationsTypes = {
  [ClaimMutationType.SET_CLAIMS](state: ClaimState, payload: Claim[]): void;
  [ClaimMutationType.SET_LINKS](
    state: ClaimState,
    payload: PaginationLinksType
  ): void;
};

export const mutations: MutationTree<ClaimState> & ClaimMutationsTypes = {
  [ClaimMutationType.SET_CLAIMS](state, payload) {
    state.claims = payload;
  },
  [ClaimMutationType.SET_LINKS](state, payload) {
    state.links = payload;
  },
};
