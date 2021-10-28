import { ModuleTree, Module } from "vuex";

import userModule from "../user";
import claimModule from "../claim";

import { RootState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

const modules: ModuleTree<RootState> = {
  userModule,
  claimModule,
};

const root: Module<RootState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  modules,
};

export default root;
