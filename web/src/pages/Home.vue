<script setup lang="ts">
import { useHead } from "@vueuse/head";

import BaseLayout from "../components/layouts/BaseLayout.vue";
import Form from "../components/claims/Form.vue";

useHead({
  title: "LRV - Registrar reclamo o queja",
  meta: [
    {
      name: `description`,
      content:
        "Registra tus reclamos y quejas en nuestro libro de reclamaciones, de la Dirección Regional de Educación de Ayacucho",
    },
  ],
});
</script>
<template>
  <BaseLayout>
    <div class="wrapper my-8">
      <div class="bg-blue-500 text-white p-6 rounded-lg flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: solid/information-circle -->
          <svg
            class="h-5 w-5 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3 flex-1 md:flex md:justify-between">
          <p class="text-sm">
            Estimado usuario: Ponemos a su disposición el presente formato, a
            través del cual podrá expresar su INSATISFACCIÓN O DISCONFORMIDAD
            RESPECTO DE LA ATENCIÓN RECIBIDA EN LA DRE AYACUCHO en el ejercicio
            de su función administrativa (regulada por el Decreto Supremo N°
            042-2011-PCM). Por favor llenar debidamente los campos solicitados.
          </p>
        </div>
      </div>
      <Form />
    </div>
  </BaseLayout>
</template>
