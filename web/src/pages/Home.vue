<script setup lang="ts">
import BaseLayout from "../components/layouts/BaseLayout.vue";
import ButtonLink from "../components/navigations/ButtonLink.vue";

import { useI18n } from "vue3-i18n";
const { t } = useI18n();
</script>
<template>
  <BaseLayout
    title="Bienvenidos al libro de reclamaciones"
    description="Nuestro libro de reclamaciones, de la Dirección Regional de Educación de Ayacucho"
  >
    <div class="wrapper mt-8 mb-6 px-5 md:px-10 flex flex-col items-center">
      <h1 class="font-bold text-2xl md:text-5xl text-center">
        {{ t("Cuentanos ¿Qué te molesta?") }}
      </h1>
      <p
        class="
          font-normal
          mt-4
          text-base
          md:text-2xl
          text-center
          w-full
          md:w-1/2
        "
        style="font-weight: 400"
      >
        {{
          t(
            "Te invitamos a registrar tu queja o reclamo y nosotros nos encargaremos de atender tu pedido"
          )
        }}.
      </p>
      <div class="my-8 flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <ButtonLink href="/claims/create" color="primary" class="px-8">
          {{ t("Registrar reclamo") }}
        </ButtonLink>
        <router-link
          to="/consult"
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
          <span class="flex-shrink-0 mr-3">
            {{ t("Consultar mi reclamo") }}
          </span>
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
              d="m17 8 4 4m0 0-4 4m4-4H3"
            />
          </svg>
        </router-link>
      </div>
    </div>
    <div class="wrapper px-0 md:px-6 flex items-center justify-center">
      <div class="rounded-2xl bg-yellow-200 px-14">
        <img src="../assets/home.svg" alt="Home image" class="mt-10" />
      </div>
    </div>
  </BaseLayout>
</template>
