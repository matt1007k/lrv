<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue3-i18n";
const { t, getLocale, setLocale } = useI18n();
const toggleLocales = (locale: string) => {
  setLocale(locale);
  localStorage.setItem("locale", locale);
};
const open = ref<boolean>(false);
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
      "
      @click="open = !open"
    >
      {{ t("Lenguaje") }}: {{ getLocale() }}
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
          min-w-40
          right-0
          bg-white
          text-black
          dark:bg-gray-secondary dark:text-white
          shadow-lg
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
