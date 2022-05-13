<script setup lang="ts">
import { ref } from "vue";
import MobileMenu from "../modals/MobileMenu.vue";

const isOpen = ref<boolean>(false);

const openModal = () => {
  isOpen.value = true;
};

const onClose = () => {
  isOpen.value = false;
};
</script>

<template>
  <div
    class="block md:hidden fixed z-50 bottom-5 right-5 left-5 bg-black bg-opacity-5 dark:bg-gray-secondary dark:bg-opacity-50 backdrop-filter backdrop-blur-md p-3 rounded-full print-none"
  >
    <div class="flex items-center justify-between w-full">
      <router-link
        to="/admin"
        class="py-3 px-4 flex items-center justify-center rounded-full cursor-pointer space-x-2 text-black dark:text-white"
      >
        <!-- @if (Request::routeIs('dashboard')) -->
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7z"
          />
        </svg>
        <!-- @else
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
            d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"
          />
        </svg>
        @endif -->
      </router-link>

      <router-link
        to="/claims/create"
        class="p-3 flex items-center justify-center bg-blue-500 rounded-full cursor-pointer space-x-2 text-white"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>

      <button
        class="flex items-center justify-center rounded-full cursor-pointer space-x-2 p-3 text-gray-400 dark:text-gray-300"
        @click="openModal"
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
            d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
          />
        </svg>
      </button>
    </div>
    <MobileMenu :isOpen="isOpen" @onClose="onClose" />
  </div>
</template>
