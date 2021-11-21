<script setup lang="ts">
import BaseLayout from "../components/layouts/BaseLayout.vue";
import ButtonLink from "../components/navigations/ButtonLink.vue";
</script>
<template>
  <BaseLayout
    title="Elegir un opción para registrar reclamo o pedido"
    description="Registra tus reclamos y quejas en nuestro libro de reclamaciones, de la Dirección Regional de Educación de Ayacucho"
  >
    <div
      class="wrapper mt-8 mb-6 px-5 md:px-10 flex flex-col items-center"
      style="height: calc(100vh - 18rem)"
    >
      <h1 class="font-bold text-lg md:text-2xl text-center">
        ¿Qué deseas hacer?
      </h1>
      <p class="font-normal mt-0 text-center w-full md:w-1/2 text-gray-500">
        Elige una opción para continuar la operación.
      </p>
      <div class="my-8 flex flex-col gap-4 w-full md:w-auto">
        <ButtonLink href="/claims/create" color="primary" class="px-8"
          >Registrar reclamo sin ingresar</ButtonLink
        >
        <ButtonLink
          href="/login"
          color="white"
          class="
            flex
            items-center
            justify-center
            py-3
            px-8
            font-semibold
            rounded-md
            bg-white
            shadow
            hover:bg-gray-50
          "
        >
          Ingresar y registar un reclamo
        </ButtonLink>
      </div>
    </div>
  </BaseLayout>
</template>
