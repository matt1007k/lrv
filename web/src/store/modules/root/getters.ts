import { GetterTree } from "vuex";
import { RootState } from "./state";

export enum RootGetterType {
  GET_ROOT = "GET_ROOT",
  IS_DARK = "IS_DARK",
}

export type RootGettersTypes = {
  [RootGetterType.GET_ROOT](state: RootState): RootState;
  [RootGetterType.IS_DARK](state: RootState): boolean;
};

export const getters: GetterTree<RootState, RootState> & RootGettersTypes = {
  [RootGetterType.GET_ROOT]: (state: RootState) => {
    return state;
  },
  [RootGetterType.IS_DARK]: (state: RootState) => {
    return state.isDark;
  },
};
