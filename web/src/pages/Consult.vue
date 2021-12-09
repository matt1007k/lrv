<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue3-i18n";

import BaseLayout from "../components/layouts/BaseLayout.vue";
import ButtonLink from "../components/navigations/ButtonLink.vue";
import TextField from "../components/forms/TextField.vue";
import Button from "../components/forms/Button.vue";

const router = useRouter();
const { t } = useI18n();

const trackingCode = ref<string>("");
const message = ref<string>("");

const isEmpty = computed(() => {
  if (!trackingCode.value) {
    message.value = "El código de seguimiento es obligatorio";
    return true;
  }
  message.value = "";
  return false;
});

const handleSubmit = () => {
  router.push(`/detail/${trackingCode.value}`);
};
</script>
<template>
  <BaseLayout
    title="Consultar mi reclamo o queja"
    description="Cosultar mi reclamo o queja registrado en el libro de reclamaciones, de la Dirección Regional de Educación de Ayacucho"
  >
    <div
      class="wrapper mt-8 mb-6 px-5 md:px-10 flex flex-col items-center"
      style="height: calc(100vh - 18rem)"
    >
      <h1 class="font-bold text-lg md:text-2xl text-center">
        {{ t("Consultar reclamo o queja") }}
      </h1>
      <p class="font-normal mt-0 text-center w-full md:w-1/2 text-gray-500">
        {{ t("Ingresar el código de seguimiento continuar la operación") }}.
      </p>
      <form
        @submit.prevent="handleSubmit"
        class="my-8 flex flex-col w-full md:w-2/6 gap-5"
      >
        <TextField
          v-model="trackingCode"
          type="number"
          name="trackingCode"
          :placeholder="t('Ingresa el código de seguimiento')"
          icon="hash"
          inline
          required
        />
        <Button type="submit" color="primary" :disabled="isEmpty">{{
          t("Consultar")
        }}</Button>
      </form>
    </div>
  </BaseLayout>
</template>
