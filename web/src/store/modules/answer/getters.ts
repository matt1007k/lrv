import { GetterTree } from "vuex";
import { AnswerState, Answer } from "./state";

import { RootState } from "../root/state";

export enum AnswerGetterType {
  GET_ANSWERS = "GET_ANSWERS",
}

export type AnswerGettersTypes = {
  [AnswerGetterType.GET_ANSWERS](state: AnswerState): Answer[];
};

export const getters: GetterTree<AnswerState, RootState> & AnswerGettersTypes =
  {
    [AnswerGetterType.GET_ANSWERS]: (state: AnswerState) => {
      return state.answers;
    },
  };
