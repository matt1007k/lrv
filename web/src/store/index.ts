import { createStore, useStore as VuexStore } from "vuex";

import root from "./modules/root";

import { RootState } from "./modules/root/state";
import { UserStoreModuleTypes } from "./modules/user/types";
import { RootStoreModuleTypes } from "./modules/root/types";
import { ClaimStoreModuleTypes } from "./modules/claim/types";

const store = createStore<RootState>(root);

type StoreModules = {
  userModule: UserStoreModuleTypes;
  rootModule: RootStoreModuleTypes;
  claimModule: ClaimStoreModuleTypes;
};

export type Store = UserStoreModuleTypes<Pick<StoreModules, "userModule">> &
  RootStoreModuleTypes<Pick<StoreModules, "rootModule">> &
  ClaimStoreModuleTypes<Pick<StoreModules, "claimModule">>;

export function useStore(): Store {
  return VuexStore() as Store;
}
export default store;
