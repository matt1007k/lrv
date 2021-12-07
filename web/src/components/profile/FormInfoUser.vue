<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue3-i18n";

import Button from "../forms/Button.vue";
import MessageError from "../forms/MessageError.vue";
import Alert from "../message/Alert.vue";
import TextField from "../forms/TextField.vue";

import { useStore } from "../../store";
import { UserMutationType } from "../../store/modules/user/userMutation";
import { get, post } from "../../utils/request";
import { UserGettersTypes } from "../../store/modules/user/userGetter";

const router = useRouter();
const store = useStore();
const { t } = useI18n();

const getUserAuth = async () => {
  const url = "/users/detail";
  try {
    const { data: user } = await get(url);
    store.commit(UserMutationType.CreateUser, user);
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => getUserAuth());
const user = computed(() => store.getters[UserGettersTypes.GET_USER]);

const form = reactive<{
  name: string;
  email: string;
}>({
  name: user.value.name ?? "",
  email: user.value.email ?? "",
});

const errors = reactive<{ values: Record<string, string> }>({
  values: {},
});

const message = ref<string>("");

const update = async () => {
  try {
    const url = "/users/update-info";
    const { data, status } = await post(url, form);
    if (status == 422) {
      message.value = "";
      errors.values = data.errors;
    } else if (status === 200) {
      errors.values = {};
      message.value = "Tu datos se cambiaron correctamente";
    }
  } catch (error) {}
};
</script>
<template>
  <div class="bg-white dark:bg-gray-secondary mt-6 mb-4 p-6 rounded-lg shadow">
    <Alert v-if="message" color="success">{{ t(message) }}</Alert>
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
              {{ t("Información del Perfil") }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              {{
                t(
                  "Actualice la información de perfil y la dirección de correo electrónico de su cuenta"
                )
              }}.
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
                for="name"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                {{ t("Nombre") }}
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <TextField
                  name="name"
                  inline
                  icon="user"
                  v-model="form.name"
                  id="name"
                  class="max-w-lg sm:max-w-xs"
                  :error="errors.values.name"
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
                for="email"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                {{ t("Correo electrónico") }}
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2 mb-5">
                <TextField
                  v-model="form.email"
                  icon="email"
                  id="email"
                  class="max-w-lg sm:max-w-xs"
                  :error="errors.values.email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end space-x-4">
          <Button type="submit" color="primary">{{ t("Guardar") }}</Button>
        </div>
      </div>
    </form>
  </div>
</template>
