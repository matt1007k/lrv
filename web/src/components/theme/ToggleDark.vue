<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "../../store";
import { RootActionType } from "../../store/modules/root/actions";
import { RootGetterType } from "../../store/modules/root/getters";

const store = useStore();
const isDark = computed(() => store.getters[RootGetterType.IS_DARK]);
const toggleTheme = () => {
  store.dispatch(RootActionType.TOGGLE_DARK);
};
onMounted(() => toggleTheme());
</script>
<template>
  <div class="flex items-center space-x-3">
    <span class="text-md text-gray-500 dark:text-gray-300 font-semibold">
      Modo {{ isDark ? "claro" : "oscuro" }}
    </span>
    <div
      @click="toggleTheme"
      class="
        flex
        items-center
        justify-center
        p-3
        rounded-full
        bg-white
        text-gray-500
        hover:bg-gray-100
        dark:bg-gray-secondary dark:text-white dark:hover:bg-opacity-80
        shadow-lg
        cursor-pointer
        group
      "
    >
      <transition
        enter-active-class="transition ease-linear duration-200"
        enter-from-class="transform opacity-0 -translate-y-full"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-full"
      >
        <svg
          v-show="isDark"
          class="w-6 h-6 group-hover:text-yellow-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
          />
        </svg>
      </transition>
      <transition
        enter-active-class="transition ease-linear duration-200"
        enter-from-class="transform opacity-0 translate-y-full"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 translate-y-full"
      >
        <svg
          v-show="!isDark"
          class="w-6 h-6 group-hover:text-gray-custom"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"
          />
        </svg>
      </transition>
    </div>
  </div>
</template>
