<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "../../store";
import { UserGettersTypes } from "../../store/modules/user/userGetter";
import { UserMutationType } from "../../store/modules/user/userMutation";
import { get } from "../../utils/request";

import Link from "../navigations/Link.vue";

const store = useStore();
const isAuthenticated = computed(
  () => store.getters[UserGettersTypes.IS_AUTHENTICATED]
);

const getFirstName = (fullName: string) => fullName.split(" ")[0];

const getUserAuth = async () => {
  const url = "/users/detail";
  try {
    const { data: user } = await get(url);
    store.commit(UserMutationType.CreateUser, user);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => getUserAuth());
const user = computed(() => store.getters[UserGettersTypes.GET_USER]);
</script>

<template>
  <nav class="py-6 flex justify-between items-center relative z-10 wrapper">
    <div class="flex items-center">
      <router-link to="/">
        <img
          src="../../assets/logo.png"
          alt="Logo Drea"
          class="w-10 md:w-14 mr-10"
        />
      </router-link>
      <div class="hidden md:flex items-center space-x-5">
        <template v-if="isAuthenticated">
          <Link href="/admin">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6M5.436 13.683A4.001 4.001 0 0 1 7 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 0 1-1.564-.317z"
              />
            </svg>
            <span>Quejas</span>
          </Link>
        </template>
        <template v-else> </template>
      </div>
    </div>
    <div class="hidden md:flex items-center space-x-8">
      <template v-if="isAuthenticated"> </template>
      <template v-else>
        <router-link
          to="/login"
          class="
            font-semibold
            text-gray-500
            hover:text-gray-800
            dark:text-gray-300 dark:hover:text-white
          "
          >Ingresar</router-link
        >
      </template>
    </div>
  </nav>
</template>
