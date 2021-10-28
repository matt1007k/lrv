import { Module } from "vuex";
import { state, ClaimState } from "./state";
import { RootState } from "../root/state";

import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

const root: Module<ClaimState, RootState> = {
  state,
  mutations,
  actions,
  getters,
};

export default root;
