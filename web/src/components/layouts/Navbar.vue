<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue3-i18n";

import ToggleDark from "../theme/ToggleDark.vue";
import Dropdown from "../overlays/Dropdown.vue";
import DropdownItemLink from "../overlays/DropdownItemLink.vue";
import DropdownItem from "../overlays/DropdownItem.vue";

import { useStore } from "../../store";
import { UserGettersTypes } from "../../store/modules/user/userGetter";
import { UserMutationType } from "../../store/modules/user/userMutation";
import { UserActionTypes } from "../../store/modules/user/userAction";

import { get } from "../../utils/request";
import { getFirstName } from "../../utils/user";
import ButtonLink from "../navigations/ButtonLink.vue";
import LocaleDropdown from "../locales/LocaleDropdown.vue";

const router = useRouter();
const { t } = useI18n();
const store = useStore();
const isAuthenticated = computed(
  () => store.getters[UserGettersTypes.IS_AUTHENTICATED]
);

const getUserAuth = async () => {
  const url = "/users/detail";
  try {
    const { data: user, status } = await get(url);
    if (status === 401) logOut();
    else store.commit(UserMutationType.CreateUser, user);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => getUserAuth());
const user = computed(() => store.getters[UserGettersTypes.GET_USER]);

const logOut = () => {
  store.dispatch(UserActionTypes.LOG_OUT);
  router.push("/login");
};
</script>

<template>
  <nav class="py-6 flex justify-between items-center wrapper">
    <div class="flex items-center">
      <img
        src="../../assets/logo.png"
        alt="Logo Drea"
        class="w-10 md:w-12 mr-10"
      />
      <div class="hidden md:flex items-center space-x-5">
        <template v-if="isAuthenticated">
          <router-link
            to="/admin"
            class="
              text-gray-400
              dark:text-gray-100 dark:hover:text-white
              font-semibold
              flex
              items-center
              space-x-2
              h-14
              transition
              duration-200
              ease-linear
              py-3
              px-4
              rounded-lg
            "
            active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-secondary dark:hover:text-gray-100"
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
                d="M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6M5.436 13.683A4.001 4.001 0 0 1 7 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 0 1-1.564-.317z"
              />
            </svg>
            <span>{{ t("Libro") }}</span>
          </router-link>
          <!-- <router-link
            to="/other"
            class="
              text-gray-400
              dark:text-gray-100 dark:hover:text-white
              font-semibold
              flex
              items-center
              space-x-2
              h-14
              transition
              duration-200
              ease-linear
              px-4
              py-3
              rounded-lg
            "
            active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-secondary dark:hover:text-gray-100"
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
                d="M7 8h10M7 12h4m1 8-4-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-4 4z"
              />
            </svg>
            <span>Nosotros</span>
          </router-link> -->
        </template>
        <template v-else> </template>
      </div>
    </div>
    <div class="hidden md:flex items-center space-x-4">
      <template v-if="isAuthenticated">
        <ButtonLink href="/claims/create" color="primary">{{
          t("Nuevo reclamo")
        }}</ButtonLink>
        <ToggleDark />
        <LocaleDropdown />
        <Dropdown>
          <template v-slot:trigger>
            <div
              class="
                bg-white
                text-black
                hover:bg-gray-100
                dark:bg-gray-secondary dark:text-white dark:hover:bg-opacity-80
                px-6
                py-3
                rounded-full
                shadow-lg
                hidden
                md:flex
                items-center
                space-x-3
                cursor-pointer
              "
            >
              <span>{{ getFirstName(user.name) }}</span>
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
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </div>
          </template>
          <template v-slot:content>
            <DropdownItemLink
              href="/profile"
              class="
                py-3
                px-3
                flex
                hover:bg-gray-100
                dark:hover:bg-gray-light
                text-black
                dark:text-white
                cursor-pointer
                transition
                duration-200
                ease-out
              "
            >
              {{ t("Perfil") }}
            </DropdownItemLink>
            <DropdownItem
              class="
                py-3
                px-3
                flex
                hover:bg-gray-100
                dark:hover:bg-gray-light
                text-black
                dark:text-white
                cursor-pointer
                transition
                duration-200
                ease-out
              "
              @click="logOut"
            >
              {{ t("Salir") }}
            </DropdownItem>
          </template>
        </Dropdown>
      </template>
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
