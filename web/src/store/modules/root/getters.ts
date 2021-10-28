import { GetterTree } from "vuex";
import { RootState } from "./state";

export enum RootActions {
  GET_ROOT = "GET_ROOT",
}

export type RootGettersTypes = {
  [RootActions.GET_ROOT](state: RootState): RootState;
};

export const getters: GetterTree<RootState, RootState> & RootGettersTypes = {
  [RootActions.GET_ROOT]: (state: RootState) => {
    return state;
  },
};
