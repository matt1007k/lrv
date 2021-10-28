import { Module } from "vuex";
import { getters } from "./userGetter";
import { UserState, userState } from "./userState";
import { userMutations } from "./userMutation";
import { userActions } from "./userAction";
import { RootState } from "../root/state";

const user: Module<UserState, RootState> = {
  state: userState,
  getters,
  mutations: userMutations,
  actions: userActions,
};

export default user;
