<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "../../store";
import { UserGettersTypes } from "../../store/modules/user/userGetter";

import { useI18n } from "vue3-i18n";
const { t } = useI18n();

import Link from "../navigations/Link.vue";
import LocaleDropdown from "../locales/LocaleDropdown.vue";

const store = useStore();
const isAuthenticated = computed(
  () => store.getters[UserGettersTypes.IS_AUTHENTICATED]
);
</script>

<template>
  <nav class="py-6 flex justify-between items-center relative z-10 wrapper">
    <div class="flex items-center">
      <router-link to="/">
        <img
          src="../../assets/logo.png"
          alt="Logo Drea"
          class="w-10 md:w-12 mr-10"
        />
      </router-link>
      <div class="flex items-center space-x-5">
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
            <span>{{ t("Libro") }}</span>
          </Link>
        </template>
        <template v-else> </template>
      </div>
    </div>
    <div class="flex items-center space-x-8">
      <LocaleDropdown />
      <template v-if="!isAuthenticated">
        <router-link
          to="/login"
          class="
            font-semibold
            text-gray-600
            hover:text-gray-800
            dark:text-gray-300 dark:hover:text-white
          "
          >{{ t("Ingresar") }}</router-link
        >
        <router-link
          to="/register"
          class="
            bg-white
            py-3
            px-5
            rounded-lg
            font-semibold
            text-blue-600
            hover:text-white hover:bg-blue-600
            dark:text-gray-100 dark:hover:text-white
            transition
            duration-150
            ease-in
          "
          >{{ t("Registrarse") }}</router-link
        >
      </template>
    </div>
  </nav>
</template>
