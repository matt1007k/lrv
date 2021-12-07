<script setup lang="ts">
import { reactive, ref } from "vue";

import SafeLayout from "../../components/layouts/SafeLayout.vue";
import TextField from "../../components/forms/TextField.vue";
import Button from "../../components/forms/Button.vue";
import Alert from "../../components/message/Alert.vue";

import { post } from "../../utils/request";

import { useI18n } from "vue3-i18n";
const { t } = useI18n();

const state = reactive({
  email: "",
});
const isSend = ref<boolean>(false);
const message = reactive<{ value: string; type: "" | "success" | "danger" }>({
  value: "",
  type: "",
});
const errors = reactive<{ values: Record<string, string> }>({ values: {} });

async function onSubmit() {
  isSend.value = true;
  const url = "/users/forgot-password";
  try {
    const { data, status } = await post(url, state);
    if (status === 404 || status === 400) {
      message.value = data.message;
      message.type = "danger";
      isSend.value = false;
    } else if (status === 422) {
      errors.values = data.errors;
      isSend.value = false;
    } else if (status == 200) {
      message.value =
        "¡Te hemos enviado por correo el enlace para restablecer tu contraseña!";
      message.type = "success";
      isSend.value = false;
      state.email = "";
      errors.values = {};
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <SafeLayout
    title="Olvide mi contraseña"
    description="Ingresar tu correo para recuperar tu contraseña"
  >
    <div
      class="
        bg-gradient-to-tr
        from-blue-500
        via-green-200
        to-yellow-200
        dark:bg-gray-custom
        flex
        items-center
        justify-center
        h-screen
      "
    >
      <div
        class="
          bg-white
          dark:bg-gray-secondary
          p-5
          md:px-10 md:py-12
          rounded-2xl
          shadow-md
          w-full
          sm:w-4/5
          md:w-4/12
        "
      >
        <h4 class="text-center mb-6">{{ t("Recuperar contraseña") }}</h4>
        <form class="w-full md:w-4/5 mx-auto" @submit.prevent="onSubmit">
          <Alert
            v-if="message.value != '' && message.type != ''"
            :color="message.type"
            class="mb-3"
            >{{ t(message.value) }}</Alert
          >
          <TextField
            v-model="state.email"
            type="email"
            name="email"
            :placeholder="t('Correo electrónico')"
            icon="email"
            inline
            required
            :error="errors.values.email"
          />

          <Button color="primary" class="w-full mt-8" :disabled="isSend">
            <span v-if="isSend">{{ t("Enviando") }}...</span>
            <span v-else>{{ t("Recuperar contraseña") }}</span>
          </Button>
        </form>
      </div>
    </div>
  </SafeLayout>
</template>
