import { ActionContext, ActionTree } from "vuex";

import { Answer, AnswerState } from "./state";
import { RootState } from "../root/state";

import { AnswerMutationsTypes, AnswerMutationType } from "./mutations";

export enum AnswerActionType {
  GET_ANSWERS = "GET_ANSWERS",
}
type ActionArguments = Omit<ActionContext<AnswerState, RootState>, "commit"> & {
  commit<K extends keyof AnswerMutationsTypes>(
    key: K,
    payload?: Parameters<AnswerMutationsTypes[K]>[1]
  ): ReturnType<AnswerMutationsTypes[K]>;
};

export type AnswerActionsTypes = {
  [AnswerActionType.GET_ANSWERS](
    { commit }: ActionArguments,
    payload: { data: Answer[] }
  ): void;
};

export const actions: ActionTree<AnswerState, RootState> & AnswerActionsTypes =
  {
    [AnswerActionType.GET_ANSWERS]({ commit }, payload) {
      commit(AnswerMutationType.SET_ANSWERS, payload.data);
    },
  };
