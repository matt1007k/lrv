import { MutationTree } from "vuex";
import { AnswerState, Answer } from "./state";

export enum AnswerMutationType {
  SET_ANSWERS = "SET_ANSWERS",
  ADD_ANSWER = "ADD_ANSWER",
}

export type AnswerMutationsTypes = {
  [AnswerMutationType.SET_ANSWERS](state: AnswerState, payload: Answer[]): void;
  [AnswerMutationType.ADD_ANSWER](state: AnswerState, payload: Answer): void;
};

export const mutations: MutationTree<AnswerState> & AnswerMutationsTypes = {
  [AnswerMutationType.SET_ANSWERS](state, payload) {
    state.answers = payload;
  },
  [AnswerMutationType.ADD_ANSWER](state, payload) {
    state.answers = [payload, ...state.answers];
  },
};
