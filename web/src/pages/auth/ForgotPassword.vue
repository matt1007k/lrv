<script setup lang="ts">
import { reactive, ref } from "vue";

import BaseLayout from "../../components/layouts/BaseLayout.vue";
import TextField from "../../components/forms/TextField.vue";
import Button from "../../components/forms/Button.vue";
import Alert from "../../components/message/Alert.vue";

import { post } from "../../utils/request";

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
    } else {
      message.value =
        "¡Te hemos enviado por correo el enlace para restablecer tu contraseña!";
      message.type = "success";
      isSend.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <BaseLayout
    title="LRV - Olvide mi contraseña"
    description="Ingresar tu correo para recuperar tu contraseña"
  >
    <div
      class="
        bg-gray-100
        dark:bg-gray-custom
        flex
        items-center
        justify-center
        my-4
        md:my-40
        h-full
      "
    >
      <div
        class="
          bg-white
          dark:bg-gray-secondary
          px-10
          py-12
          rounded-2xl
          shadow-md
          w-full
          sm:w-4/5
          md:w-4/12
        "
      >
        <h4 class="text-center mb-6">Recuperar contraseña</h4>
        <form class="w-full md:w-4/5 mx-auto" @submit.prevent="onSubmit">
          <Alert
            v-if="message.value != '' && message.type != ''"
            :color="message.type"
            class="mb-3"
            >{{ message.value }}</Alert
          >
          <TextField
            v-model="state.email"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            icon="email"
            inline
            required
            :class="{ 'border-red-500': !!errors.values.email }"
          />
          <MessageError
            :show="!!errors.values.email"
            :text="errors.values.email"
          />

          <Button color="primary" class="w-full mt-8" :disabled="isSend">
            <span v-if="isSend">Enviando...</span>
            <span v-else>Recuperar contraseña</span>
          </Button>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>
