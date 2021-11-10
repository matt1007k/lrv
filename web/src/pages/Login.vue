<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import BaseLayout from "../components/layouts/BaseLayout.vue";
import PasswordField from "../components/forms/PasswordField.vue";
import TextField from "../components/forms/TextField.vue";

import Button from "../components/forms/Button.vue";

import { post } from "../utils/request";

import { useStore } from "../store";
import { UserActionTypes } from "../store/modules/user/userAction";

const router = useRouter();

const store = useStore();
const state = reactive({
  email: "",
  password: "",
});
const message = ref<string>("");

async function onSubmit() {
  localStorage.removeItem("token");
  const url = "/users/login";
  try {
    const { data, status } = await post(url, state);
    if (status === 400) message.value = data.message;
    else {
      message.value = "";
      store.dispatch(UserActionTypes.LOG_IN, data);

      router.push("/admin");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <BaseLayout
    title="LRV - Ingresar para continuar"
    description="Ingresar para realiza administratar los reclamos y quejas en nuestro libro de reclamaciones, de la Dirección Regional de Educación de Ayacucho"
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
        <img
          src="../assets/logo.png"
          alt="Logo DREA"
          class="w-1/6 mx-auto mb-4"
        />
        <h4 class="text-center mb-12">Ingresar para continuar</h4>
        <form class="w-full md:w-4/5 mx-auto" @submit.prevent="onSubmit">
          <template v-if="message"
            ><div
              class="p-4 mb-3 bg-red-500 text-white rounded-md text-sm"
              v-text="message"
            ></div
          ></template>
          <TextField
            v-model="state.email"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            icon="email"
            inline
            required
          />
          <PasswordField
            v-model="state.password"
            placeholder="Contraseña"
            class="mb-3"
          />
          <a
            href="#"
            class="text-blue-500 dark:text-white font-medium underline -mt-8"
            >Restablecer contraseña</a
          >

          <Button color="primary" class="w-full mt-8">Ingresar</Button>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>
