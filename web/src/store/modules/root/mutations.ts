import { MutationTree } from "vuex";
import { RootState } from "./state";
export enum RootMutationType {
  SET_THEME = "SET_THEME",
}
export type RootMutationsTypes = {
  [RootMutationType.SET_THEME](state: RootState, payload: boolean): void;
};

export const mutations: MutationTree<RootState> & RootMutationsTypes = {
  [RootMutationType.SET_THEME](state: RootState, payload) {
    state.isDark = payload;
  },
};
