<script setup lang="ts">
import BaseLayout from "../components/layouts/BaseLayout.vue";
</script>

<template>
  <BaseLayout>
    <div
      class="
        wrapper
        h-screen
        md:h-screen
        my-0
        md:mt-8 md:-mb-8
        flex
        items-start
        justify-center
      "
    >
      <div
        class="
          w-full
          md:w-1/2
          bg-white
          shadow
          border border-gray-100
          p-5
          rounded-xl
        "
      >
        <div class="flex items-center justify-center text-green-500 mb-6">
          <svg
            class="w-20 h-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h4 class="mb-12 text-center text-base md:text-lg font-medium">
          Registro completado con éxito
        </h4>
        <router-link
          to="/"
          class="
            flex
            items-center
            justify-center
            px-4
            py-3
            bg-blue-500
            hover:bg-blue-600
            text-white text-base
            font-medium
            rounded
            w-full
          "
          >Registrar otro
        </router-link>
      </div>
    </div>
  </BaseLayout>
</template>
