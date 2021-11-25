import { Module } from "vuex";
import { state, AnswerState } from "./state";
import { RootState } from "../root/state";

import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

const root: Module<AnswerState, RootState> = {
  state,
  mutations,
  actions,
  getters,
};

export default root;
