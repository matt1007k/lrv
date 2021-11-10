<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import Button from "../forms/Button.vue";
import MessageError from "../forms/MessageError.vue";
import Alert from "../message/Alert.vue";
import PasswordField from "../forms/PasswordField.vue";

import { post } from "../../utils/request";

const router = useRouter();

const form = reactive<{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}>({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const errors = reactive<{ values: Record<string, string> }>({
  values: {},
});

const message = ref<string>("");

const resetForm = () => {
  form.currentPassword = "";
  form.newPassword = "";
  form.confirmPassword = "";
};

const update = async () => {
  try {
    const url = "/users/update-password";
    const { data, status } = await post(url, form);
    if (status == 422) {
      message.value = "";
      errors.values = data.errors;
    } else if (status === 200) {
      errors.values = {};
      message.value = "Tu contraseña fue cambiado correctamente.";
      resetForm();
    }
  } catch (error) {}
};
</script>
<template>
  <div class="bg-white dark:bg-gray-secondary mt-6 p-6 rounded-lg shadow">
    <Alert v-if="message" color="success">{{ message }}</Alert>
    <form
      class="space-y-0 divide-y divide-gray-200 dark:divide-gray-custom"
      @submit.prevent="update"
    >
      <div
        class="
          space-y-8
          divide-y divide-gray-200
          dark:divide-gray-custom
          sm:space-y-5
        "
      >
        <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3
              class="
                text-lg
                leading-6
                font-medium
                text-gray-900
                dark:text-white
              "
            >
              Actualizar Contraseña
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Asegúrese de que su cuenta esté usando una contraseña larga y
              aleatoria para mantenerse seguro.
            </p>
          </div>
          <div class="space-y-6 sm:space-y-5">
            <div
              class="
                sm:grid
                sm:grid-cols-3
                sm:gap-4
                sm:items-start
                sm:border-t
                sm:border-gray-200
                sm:dark:border-gray-custom
                sm:pt-5
              "
            >
              <label
                for="current-password"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Contraseña actual
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <PasswordField
                  v-model="form.currentPassword"
                  id="current-password"
                  class="max-w-lg sm:max-w-xs"
                />

                <MessageError
                  :show="!!errors.values.currentPassword"
                  :text="errors.values.currentPassword"
                />
              </div>
            </div>

            <div
              class="
                sm:grid
                sm:grid-cols-3
                sm:gap-4
                sm:items-start
                sm:border-t
                sm:border-gray-200
                sm:dark:border-gray-custom
                sm:pt-5
              "
            >
              <label
                for="new-password"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Nueva contraseña
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <PasswordField
                  v-model="form.newPassword"
                  id="new-password"
                  class="max-w-lg sm:max-w-xs"
                />
                <MessageError
                  :show="!!errors.values.newPassword"
                  :text="errors.values.newPassword"
                />
              </div>
            </div>

            <div
              class="
                sm:grid
                sm:grid-cols-3
                sm:gap-4
                sm:items-start
                sm:border-t
                sm:border-gray-200
                sm:dark:border-gray-custom
                sm:pt-5
              "
            >
              <label
                for="confirm-password"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Repetir contraseña
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2 mb-5">
                <PasswordField
                  v-model="form.confirmPassword"
                  id="confirm-password"
                  class="max-w-lg sm:max-w-xs"
                />
                <MessageError
                  :show="!!errors.values.confirmPassword"
                  :text="errors.values.confirmPassword"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end space-x-4">
          <Button type="submit" color="primary">Guardar</Button>
        </div>
      </div>
    </form>
  </div>
</template>
