import { RootState } from "./state";
import { ActionContext, ActionTree } from "vuex";
import { RootMutationType, RootMutationsTypes } from "./mutations";

export enum RootActionType {
  TOGGLE_DARK = "TOGGLE_DARK",
}
type ActionArguments = Omit<ActionContext<RootState, RootState>, "commit"> & {
  commit<K extends keyof RootMutationsTypes>(
    key: K,
    payload?: Parameters<RootMutationsTypes[K]>[1]
  ): ReturnType<RootMutationsTypes[K]>;
};
export type RootActionsTypes = {
  [RootActionType.TOGGLE_DARK]({ commit }: ActionArguments): void;
};

export const actions: ActionTree<RootState, RootState> & RootActionsTypes = {
  [RootActionType.TOGGLE_DARK]({ commit }) {
    const isDark = localStorage.getItem("isDark") ? true : false;
    const bodyClass = window.document.body.classList;

    commit(RootMutationType.SET_THEME, isDark);

    !isDark
      ? localStorage.setItem("isDark", "true")
      : localStorage.removeItem("isDark");

    isDark ? bodyClass.add("dark") : bodyClass.remove("dark");
  },
};
