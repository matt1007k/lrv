import { GetterTree } from "vuex";
import { RootState } from "./state";

export enum RootGetterType {
  GET_ROOT = "GET_ROOT",
  IS_DARK = "IS_DARK",
  GET_MESSAGE = "GET_MESSAGE",
}

export type RootGettersTypes = {
  [RootGetterType.GET_ROOT](state: RootState): RootState;
  [RootGetterType.IS_DARK](state: RootState): boolean;
  [RootGetterType.GET_MESSAGE](state: RootState): string;
};

export const getters: GetterTree<RootState, RootState> & RootGettersTypes = {
  [RootGetterType.GET_ROOT]: (state: RootState) => {
    return state;
  },
  [RootGetterType.IS_DARK]: (state: RootState) => {
    return state.isDark;
  },
  [RootGetterType.GET_MESSAGE]: (state: RootState) => {
    return state.message;
  },
};
