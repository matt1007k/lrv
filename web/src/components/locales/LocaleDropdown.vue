<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue3-i18n";
const { t, getLocale, setLocale } = useI18n();

const open = ref<boolean>(false);

const toggleLocales = (locale: string) => {
  setLocale(locale);
  localStorage.setItem("locale", locale);
};

const getLanguage = () => {
  if (getLocale() === "es") return "Castellano";
  if (getLocale() === "qu") return "Quechua";
};
onMounted(() => {
  if (localStorage.getItem("locale")) {
    //@ts-ignore
    setLocale(localStorage.getItem("locale"));
  }
});
</script>

<template>
  <div class="relative">
    <button
      class="
        px-5
        py-3
        bg-white
        text-black
        dark:bg-gray-secondary dark:text-white
        shadow-md
        rounded-full
        font-semibold
        flex
        items-center
      "
      @click="open = !open"
    >
      <span class="mr-2">
        {{ getLanguage() }}
      </span>
      <svg
        class="w-6 h-6 text-gray-500 dark:text-gray-300"
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
    </button>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="open"
        class="
          absolute
          z-50
          rounded-md
          w-auto
          right-0
          bg-white
          text-black
          dark:bg-gray-secondary dark:text-white
          shadow-lg
          overflow-hidden
        "
        @click="open = false"
      >
        <div class="flex flex-col">
          <button
            class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-light"
            @click="toggleLocales('es')"
          >
            Castellano
          </button>
          <button
            class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-light"
            @click="toggleLocales('qu')"
          >
            Quechua
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
