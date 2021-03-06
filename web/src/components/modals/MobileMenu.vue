<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import ToggleDark from "../theme/ToggleDark.vue";

import { useStore } from "../../store";
import { UserActionTypes } from "../../store/modules/user/userAction";
import { UserGettersTypes } from "../../store/modules/user/userGetter";
import { UserMutationType } from "../../store/modules/user/userMutation";

import { get } from "../../utils/request";

const store = useStore();
const router = useRouter();

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{
  (e: "onClose"): void;
}>();

const close = () => {
  emit("onClose");
};

const getUserAuth = async () => {
  const url = "/users/detail";
  try {
    const { data, status } = await get(url);
    if (status === 401) logOut();
    else store.commit(UserMutationType.CreateUser, data);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => getUserAuth());
const user = computed(() => store.getters[UserGettersTypes.GET_USER]);

function logOut() {
  store.dispatch(UserActionTypes.LOG_OUT);
  close();

  router.push("/login");
}
</script>

<template>
  <div class="fixed left-0 right-0 bottom-0" v-show="isOpen">
    <div class="bg-white dark:bg-gray-custom w-full h-screen">
      <div class="flex flex-col items-center justify-between p-20 h-full">
        <div class="flex flex-col items-center">
          <div
            class="
              flex
              items-center
              justify-center
              p-4
              rounded-full
              bg-gray-100
              text-gray-500
              dark:text-gray-custom
              w-20
              h-20
            "
          >
            <svg
              class="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center">
            <h class="font-bold text-black dark:text-white">{{ user.name }}</h>
            <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
          </div>
          <div class="mt-12 flex flex-col items-center space-y-6">
            <router-link
              to="/profile"
              class="text-xl font-semibold text-black dark:text-white"
              >Perfil</router-link
            >
            <div
              @click="logOut"
              class="
                text-xl
                font-semibold
                text-black
                dark:text-white
                cursor-pointer
              "
            >
              Salir
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center w-full">
          <div
            class="
              border-t border-gray-300
              dark:border-gray-secondary
              w-full
              flex flex-col
              items-center
              py-4
            "
          >
            <ToggleDark />
          </div>
          <button
            @click="close"
            class="
              p-3
              bg-gray-100
              text-gray-500
              dark:bg-gray-secondary dark:text-gray-300
              rounded-full
              mt-8
            "
          >
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
