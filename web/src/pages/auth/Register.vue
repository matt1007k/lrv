<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import SafeLayout from "../../components/layouts/SafeLayout.vue";
import MessageError from "../../components/forms/MessageError.vue";
import Alert from "../../components/message/Alert.vue";
import Button from "../../components/forms/Button.vue";
import PasswordField from "../../components/forms/PasswordField.vue";
import TextField from "../../components/forms/TextField.vue";

import { post } from "../../utils/request";

import { useStore } from "../../store";
import { RootMutationType } from "../../store/modules/root/mutations";

const router = useRouter();

const store = useStore();
const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const errors = reactive<{ values: Record<string, string> }>({
  values: {},
});
const message = reactive<{ text: string; type: "success" | "danger" | "info" }>(
  {
    text: "",
    type: "success",
  }
);

async function onSubmit() {
  const url = "/users/register";
  try {
    const { data, status } = await post(url, state);
    if (status === 400 || status === 404) {
      message.text = data.message;
      message.type = "danger";
    } else if (status === 422) {
      errors.values = data.errors;
      message.text = "";
    } else {
      message.text = "";
      store.commit(
        RootMutationType.SET_MESSAGE,
        "Registro completado con exitó"
      );
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <SafeLayout
    title="Crear una cuenta"
    description="Crear una cuenta para administrar tus reclamos y quejas en nuestro libro de reclamaciones, de la Dirección Regional de Educación de Ayacucho"
  >
    <div class="w-full grid grid-cols-7 h-screen">
      <div
        class="
          col-span-7
          md:col-span-4
          flex flex-col
          bg-white
          dark:bg-gray-custom
          px-5
        "
      >
        <div class="flex items-center w-full mt-5">
          <router-link
            to="/"
            class="
              p-0
              md:p-2
              rounded-lg
              text-black
              hover:bg-gray-100
              dark:text-white dark:hover:bg-gray-secondary
              mr-1
              md:mr-2
              cursor-pointer
            "
          >
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
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </router-link>
          <div>
            <p class="text-gray-500 dark:text-gray-400 text-base">
              Regresar al
            </p>
            <h4>Inicio</h4>
          </div>
        </div>
        <div class="flex justify-center mt-5 md:pt-40">
          <div class="px-0 md:px-8 py-5 md:py-8 w-full md:w-1/2">
            <h4 class="text-center mb-8">Crear una cuenta</h4>
            <form class="w-full md:w-4/5 mx-auto" @submit.prevent="onSubmit">
              <Alert
                v-if="message.text != ''"
                :color="message.type"
                class="mb-3"
                >{{ message.text }}</Alert
              >
              <TextField
                v-model="state.name"
                type="text"
                name="name"
                placeholder="Nombre"
                icon="user"
                inline
                required
              />
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
              <PasswordField
                v-model="state.password"
                placeholder="Contraseña"
                class="mb-3"
              />
              <PasswordField
                v-model="state.confirmPassword"
                placeholder="Repetir contraseña"
                :class="{ 'border-red-500': !!errors.values.confirmPassword }"
              />
              <MessageError
                :show="!!errors.values.confirmPassword"
                :text="errors.values.confirmPassword"
              />
              <div class="mb-3"></div>

              <Button color="primary" class="w-full mt-8">Registrarse</Button>
            </form>
            <div class="mt-2 flex items-center justify-center">
              <p class="mr-2 text-gray-800">¿Ya tengo una cuenta?</p>
              <router-link
                to="/login"
                class="uppercase text-blue-500 font-medium"
                >Ingresar</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          bg-gradient-to-tr
          from-blue-500
          via-green-200
          to-yellow-200
          hidden
          col-span-3
          md:flex
          flex-col
          px-5
        "
      >
        <div
          class="w-full flex items-center justify-center"
          style="height: calc(100vh - 8em)"
        >
          <div class="px-20">
            <div class="flex items-center justify-center">
              <img
                src="../../assets/img-auth.svg"
                alt="Auth image"
                class="w-3/4"
              />
            </div>
            <h3 class="text-4xl font-bold mb-6 mt-16">
              Revisa todas tus quejas y reclamos
            </h3>
            <p class="text-xl font-light">
              Ingresa los datos para crear una cuenta, podrás tener ver todas
              los quejas y reclamos que vas ha realizar.
            </p>
          </div>
        </div>
      </div>
    </div>
  </SafeLayout>
</template>
