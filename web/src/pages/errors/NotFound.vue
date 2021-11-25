<script setup lang="ts">
import SafeLayout from "../../components/layouts/SafeLayout.vue";
</script>
<template>
  <SafeLayout title="Página no encontrada" description="Página no encontrada">
    <div class="min-h-full pt-16 pb-12 flex flex-col bg-white h-screen">
      <div
        class="
          flex-grow flex flex-col
          justify-center
          max-w-7xl
          w-full
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div class="py-16">
          <div class="text-center">
            <p
              class="
                text-sm
                font-semibold
                text-blue-600
                uppercase
                tracking-wide
              "
            >
              Error 404
            </p>
            <h1
              class="
                mt-2
                text-4xl
                font-extrabold
                text-gray-900
                tracking-tight
                sm:text-5xl
              "
            >
              Página no encontrada.
            </h1>
            <p class="mt-2 text-base text-gray-500">
              Lo sentimos, no pudimos encontrar la página que busca.
            </p>
            <div class="mt-6">
              <router-link
                to="/"
                class="text-base font-medium text-blue-600 hover:text-blue-500"
              >
                Regresar al inicio<span aria-hidden="true"> &rarr;</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SafeLayout>
</template>
