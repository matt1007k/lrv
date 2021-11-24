<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import SafeLayout from "../../components/layouts/SafeLayout.vue";
import PasswordField from "../../components/forms/PasswordField.vue";
import Button from "../../components/forms/Button.vue";
import Alert from "../../components/message/Alert.vue";

import { post } from "../../utils/request";
import MessageError from "../../components/forms/MessageError.vue";

const route = useRoute();
const router = useRouter();
const token = route.params.token;

const state = reactive({
  newPassword: "",
  confirmPassword: "",
  token: "",
});
const message = reactive<{ value: string; type: "" | "success" | "danger" }>({
  value: "",
  type: "",
});
const errors = reactive<{ values: Record<string, string> }>({ values: {} });

async function onSubmit() {
  const url = "/users/reset-password";
  try {
    const params = Object.assign(state, { token });
    const { data, status } = await post(url, params);
    if (status === 404 || status === 400) {
      message.value = data.message;
      message.type = "danger";
    } else if (status === 422) {
      console.log(data);

      errors.values = data.errors;
      message.value = "";
      message.type = "";
    } else {
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <SafeLayout
    title="Recuperar mi contraseña"
    description="Ingresar tu nueva contraseña para cambiarla."
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
        <h4 class="text-center mb-6">Recuperar mi contraseña</h4>
        <form class="w-full md:w-4/5 mx-auto" @submit.prevent="onSubmit">
          <Alert
            v-if="message.value != '' && message.type != ''"
            :color="message.type"
            class="mb-3"
            >{{ message.value }}</Alert
          >
          <div class="mb-5">
            <PasswordField
              v-model="state.newPassword"
              placeholder="Nueva contraseña"
              :class="{ 'border-red-500': !!errors.values.newPassword }"
            />
            <MessageError
              :show="!!errors.values.newPassword"
              :text="errors.values.newPassword"
            />
          </div>
          <PasswordField
            v-model="state.confirmPassword"
            placeholder="Repetir contraseña"
            :class="{ 'border-red-500': !!errors.values.confirmPassword }"
          />
          <MessageError
            :show="!!errors.values.confirmPassword"
            :text="errors.values.confirmPassword"
          />

          <Button color="primary" class="w-full mt-8"
            >Cambiar contraseña</Button
          >
        </form>
      </div>
    </div>
  </SafeLayout>
</template>
