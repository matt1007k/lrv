<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "./store";
import { UserMutationType } from "./store/modules/user/userMutation";

export default defineComponent({
  beforeCreate() {
    const store = useStore();
    store.commit(UserMutationType.INITIALIZE_STORE);
  },
});
</script>

<template>
  <router-view />
</template>
