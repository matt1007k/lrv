<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useI18n } from "vue3-i18n";
const { t } = useI18n();

import SafeLayout from "../../components/layouts/SafeLayout.vue";
import PasswordField from "../../components/forms/PasswordField.vue";
import TextField from "../../components/forms/TextField.vue";
import Button from "../../components/forms/Button.vue";
import Alert from "../../components/message/Alert.vue";

import { post } from "../../utils/request";

import { useStore } from "../../store";
import { UserActionTypes } from "../../store/modules/user/userAction";
import { RootGetterType } from "../../store/modules/root/getters";
import { RootMutationType } from "../../store/modules/root/mutations";

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
const globalMessage = computed(() => store.getters[RootGetterType.GET_MESSAGE]);
onMounted(() => {
  setTimeout(() => store.commit(RootMutationType.SET_MESSAGE, ""), 3000);
});
</script>

<template>
  <SafeLayout
    title="Ingresar para continuar"
    description="Ingresar para realiza administratar los reclamos y quejas en nuestro libro de reclamaciones, de la Dirección Regional de Educación de Ayacucho"
  >
    <div class="w-full grid grid-cols-6 h-screen">
      <div
        class="
          bg-gradient-to-tr
          from-blue-500
          via-green-200
          to-yellow-200
          hidden
          col-span-2
          md:flex
          flex-col
          px-5
        "
      >
        <div class="hidden md:flex items-center w-full mt-5">
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
              {{ t("Regresar al") }}
            </p>
            <h4>{{ t("Inicio") }}</h4>
          </div>
        </div>
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
              {{ t("Ingresa y revisa todos tus reclamos y quejas") }}
            </h3>
            <p class="text-xl font-light">
              {{
                t(
                  "Ingresa tus datos, para ver todos tus reclamos y quejas que realizaste"
                )
              }}.
            </p>
          </div>
        </div>
      </div>
      <div
        class="
          col-span-6
          md:col-span-4
          flex flex-col
          bg-white
          dark:bg-gray-custom
          px-5
        "
      >
        <div class="flex md:hidden items-center w-full mt-5">
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
          <div class="px-0 md:px-10 py-5 md:py-12 w-full md:w-1/2">
            <h4 class="text-center mb-10">
              {{ t("Ingresar para continuar") }}
            </h4>
            <form class="w-full md:w-4/5 mx-auto" @submit.prevent="onSubmit">
              <Alert v-if="globalMessage != ''" class="mb-3">{{
                t(globalMessage)
              }}</Alert>
              <div
                v-if="message"
                class="p-4 mb-3 bg-red-500 text-white rounded-md text-sm"
                v-text="t(message)"
              ></div>
              <div class="grid gap-5">
                <TextField
                  v-model="state.email"
                  type="email"
                  name="email"
                  :placeholder="t('Correo electrónico')"
                  icon="email"
                  inline
                  required
                />
                <PasswordField
                  v-model="state.password"
                  :placeholder="t('Contraseña')"
                  class="mb-3"
                />
              </div>
              <router-link
                to="/forgot-password"
                class="
                  text-blue-500
                  dark:text-white
                  font-medium
                  underline
                  -mt-8
                "
                >{{ t("¿Has olvidado tu contraseña?") }}</router-link
              >

              <Button color="primary" class="w-full mt-8">{{
                t("Ingresar")
              }}</Button>
            </form>
            <div class="mt-2 flex items-center justify-center">
              <p class="mr-2 text-gray-800">{{ t("¿No tengo una cuenta?") }}</p>
              <router-link
                to="/register"
                class="uppercase text-blue-500 font-medium"
                >{{ t("Registrarse") }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </SafeLayout>
</template>
