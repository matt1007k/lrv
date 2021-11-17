import { MutationTree } from "vuex";
import { RootState } from "./state";
export enum RootMutationType {
  SET_THEME = "SET_THEME",
  SET_MESSAGE = "SET_MESSAGE",
}
export type RootMutationsTypes = {
  [RootMutationType.SET_THEME](state: RootState, payload: boolean): void;
  [RootMutationType.SET_MESSAGE](state: RootState, payload: string): void;
};

export const mutations: MutationTree<RootState> & RootMutationsTypes = {
  [RootMutationType.SET_THEME](state: RootState, payload) {
    state.isDark = payload;
  },
  [RootMutationType.SET_MESSAGE](state: RootState, payload) {
    state.message = payload;
  },
};
