<script setup lang="ts">
import { useRoute } from "vue-router";

import BaseLayout from "../components/layouts/BaseLayout.vue";

const route = useRoute();
</script>

<template>
  <BaseLayout
    title="Registro completado con éxito"
    description="Registro completado con éxito en el libro de reclamaciones de la DREA"
  >
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
        <h4 class="text-center text-base md:text-lg font-medium">
          Registro completado con éxito
        </h4>
        <p class="mt-3 mb-10 text-center px-0 md:px-10">
          Estaremos revisando tu queja o reclamos, y te comunicaremos mediante
          un correo.
        </p>
        <div class="flex items-center gap-1">
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
          <router-link
            :to="`/detail/${route.params.trackingCode}`"
            class="
              flex
              items-center
              justify-center
              px-4
              py-3
              bg-gray-100
              hover:bg-gray-200
              text-black text-base
              font-medium
              rounded
              w-full
            "
            >Ver detalle
          </router-link>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
