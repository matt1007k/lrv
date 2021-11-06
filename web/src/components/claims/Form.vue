<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { Claim } from "../../store/modules/claim/state";
import { deleteFetch, post } from "../../utils/request";

import Button from "../forms/Button.vue";
import MessageError from "../forms/MessageError.vue";
import config from "../../utils/config";

const router = useRouter();

const form = reactive<Claim>({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  reference: "",
  department: "",
  province: "",
  district: "",
  type: "CLAIM",
  detail: "",
  order: "",
  file: "",
});

const errors = reactive<{ values: Record<string, string> }>({
  values: {},
});

const file = ref<HTMLInputElement>();
const fileLocalPathApi = ref<string>("");
const messageUploadFile = reactive<{ value: string }>({
  value: "",
});
const isError = ref<boolean>(false);
const percentaje = ref<number>(0);

const openFile = () => {
  file.value?.click();
};

const typesValid = ["image/png", "image/jpeg", "image/jpg"];
const maxSize = 1024 * 1024 * 5;
const changeFile = (ev: Event) => {
  if (file?.value?.files && file?.value?.files?.length > 0) {
    const fileValue = file.value?.files[0];
    const url = `${config.API_URL}/uploads`;

    const toolLarge = fileValue.size > maxSize;

    if (typesValid.includes(fileValue.type) && !toolLarge) {
      isError.value = false;

      const formData = new FormData();
      formData.append("file", fileValue);

      const res = new XMLHttpRequest();
      res.open("POST", url);

      res.onreadystatechange = () => {
        if (res.readyState === XMLHttpRequest.DONE) {
          const status = res.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            messageUploadFile.value = "Archivo subido con éxito.";
            const {
              filePath,
              fullPath,
            }: { filePath: string; fullPath: string } = JSON.parse(
              res.responseText
            );
            form.file = fullPath;
            fileLocalPathApi.value = filePath;
          } else if (status === 422) {
            const { error }: { error: string } = JSON.parse(res.responseText);
            messageUploadFile.value = error;
            isError.value = true;
            percentaje.value = 0;
            return;
          }
        }
      };

      res.upload.addEventListener("progress", ({ loaded, total }) => {
        let percentajeUpload = Math.floor(loaded / total) * 100;
        percentaje.value = percentajeUpload;
        setTimeout(() => {
          if (percentaje.value === 100) {
            percentaje.value = 0;
          }
        }, 1000);
      });

      res.send(formData);
    } else {
      messageUploadFile.value = toolLarge
        ? `La archivo es muy grande, el tamaño máximo permitido: ${Math.ceil(
            maxSize / 1000
          )}Kb`
        : "El archivo no es una imagen.";
      isError.value = true;
      percentaje.value = 0;
    }
  }
};

const deleteFileUpload = async () => {
  const url = "/uploads";
  try {
    const { data } = await deleteFetch(url, {
      path: fileLocalPathApi.value,
    });

    messageUploadFile.value = data.message;
    isError.value = true;
    form.file = "";
    console.log(form.file);
  } catch (error) {}
};

const register = async () => {
  try {
    const url = "/claims";
    const { data, status } = await post(url, form);
    if (status == 422) {
      errors.values = data.errors;
    } else if (status === 201) {
      router.push("/message-success");
    } else {
      errors.values = {};
    }
  } catch (error) {}
};
</script>
<template>
  <div class="bg-white dark:bg-gray-secondary mt-6 p-6 rounded-lg shadow">
    <form
      class="space-y-0 divide-y divide-gray-200 dark:divide-gray-custom"
      @submit.prevent="register"
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
              Información Personal
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Completa los campos requeridos para registrar tu queja o reclamo.
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
                for="first-name"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Nombre completo
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.fullName"
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500':
                      !!errors.values.fullName,
                  }"
                />
                <MessageError
                  :show="!!errors.values.fullName"
                  :text="errors.values.fullName"
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
                Correo electrónico
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500': !!errors.values.email,
                  }"
                />
                <MessageError
                  :show="!!errors.values.email"
                  :text="errors.values.email"
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
                for="phone"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Número de celular
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.phone"
                  type="text"
                  name="phone"
                  id="phone"
                  autocomplete="given-phone"
                  maxlength="9"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500': !!errors.values.phone,
                  }"
                />
                <MessageError
                  :show="!!errors.values.phone"
                  :text="errors.values.phone"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="
            divide-y divide-gray-200
            dark:divide-gray-custom
            pt-8
            space-y-6
            sm:pt-10 sm:space-y-5
          "
        >
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
              Tu dirección
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Completa los campos requeridos, para comunicarnos contigo.
            </p>
          </div>
          <div
            class="
              space-y-6
              sm:space-y-5
              divide-y divide-gray-200
              dark:divide-gray-custom
            "
          >
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
                for="street-address"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Dirección
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.address"
                  type="text"
                  name="street-address"
                  id="street-address"
                  autocomplete="street-address"
                  class="
                    block
                    max-w-lg
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500':
                      !!errors.values.address,
                  }"
                />
                <MessageError
                  :show="!!errors.values.address"
                  :text="errors.values.address"
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
                for="reference"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Referencia
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.reference"
                  type="text"
                  name="reference"
                  id="reference"
                  autocomplete="address-level2"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500':
                      !!errors.values.reference,
                  }"
                />
                <MessageError
                  :show="!!errors.values.reference"
                  :text="errors.values.reference"
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
                for="department"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Departamento
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.department"
                  type="text"
                  name="department"
                  id="department"
                  autocomplete="address-level1"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500':
                      !!errors.values.department,
                  }"
                />
                <MessageError
                  :show="!!errors.values.department"
                  :text="errors.values.department"
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
                for="province"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Provincia
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.province"
                  type="text"
                  name="province"
                  id="province"
                  autocomplete="address-level1"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500':
                      !!errors.values.province,
                  }"
                />
                <MessageError
                  :show="!!errors.values.province"
                  :text="errors.values.province"
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
                for="district"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Distrito
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.district"
                  type="text"
                  name="district"
                  id="district"
                  autocomplete="address-level1"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500':
                      !!errors.values.district,
                  }"
                />
                <MessageError
                  :show="!!errors.values.district"
                  :text="errors.values.district"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="
            divide-y divide-gray-200
            dark:divide-gray-custom
            pt-8
            space-y-6
            sm:pt-10 sm:space-y-5
          "
        >
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
              Detalles
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Completa los campos requeridos, describe tu queja o reclamo.
            </p>
          </div>
          <div
            class="
              space-y-6
              sm:space-y-5
              pb-6
              divide-y divide-gray-200
              dark:divide-gray-custom
            "
          >
            <div class="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-type">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <div>
                    <div
                      class="
                        text-base
                        font-medium
                        text-gray-900
                        sm:text-sm sm:text-gray-700
                        dark:text-white
                        sm:dark:text-gray-100
                      "
                      id="label-type"
                    >
                      Tipo
                    </div>
                  </div>
                  <div class="sm:col-span-2">
                    <div class="max-w-lg">
                      <div class="mt-4 space-y-4">
                        <div class="flex items-center">
                          <input
                            v-model="form.type"
                            id="claim"
                            name="type"
                            type="radio"
                            value="CLAIM"
                            checked
                            class="
                              focus:ring-indigo-500
                              h-4
                              w-4
                              text-indigo-600
                              border-gray-300
                            "
                          />
                          <label
                            for="claim"
                            class="
                              ml-3
                              block
                              text-sm
                              font-medium
                              text-gray-700
                              dark:text-gray-100
                            "
                          >
                            Reclamo
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            v-model="form.type"
                            id="complain"
                            name="type"
                            type="radio"
                            value="COMPLAIN"
                            class="
                              focus:ring-indigo-500
                              h-4
                              w-4
                              text-indigo-600
                              border-gray-300
                            "
                          />
                          <label
                            for="complain"
                            class="
                              ml-3
                              block
                              text-sm
                              font-medium
                              text-gray-700
                              dark:text-gray-100
                            "
                          >
                            Queja
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                for="detail"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Detalle
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.detail"
                  type="text"
                  name="detail"
                  id="detail"
                  autocomplete="address-level1"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500':
                      !!errors.values.detail,
                  }"
                />
                <MessageError
                  :show="!!errors.values.detail"
                  :text="errors.values.detail"
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
                for="order"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-100
                  sm:mt-px sm:pt-2
                "
              >
                Orden
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  v-model="form.order"
                  type="text"
                  name="order"
                  id="order"
                  autocomplete="address-level1"
                  class="
                    max-w-lg
                    block
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  :class="{
                    'border-red-500 dark:border-red-500': !!errors.values.order,
                  }"
                />
                <MessageError
                  :show="!!errors.values.order"
                  :text="errors.values.order"
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
              <div>
                <h6
                  class="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-gray-100
                    sm:mt-px sm:pt-2
                  "
                >
                  Archivo adjunto
                </h6>
                <p class="text-gray-500 dark:text-gray-400 text-sm">
                  Si desea subir un archivo, no debe exceder los 5MB.
                </p>
              </div>
              <div class="mt-4 sm:mt-0 sm:col-span-2">
                <input
                  ref="file"
                  type="file"
                  name="file"
                  id="file"
                  class="
                    max-w-lg
                    hidden
                    w-full
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    sm:max-w-xs sm:text-sm
                    border-gray-300
                    rounded-md
                    dark:border-gray-custom
                    dark:border-opacity-50
                    dark:bg-gray-custom
                    dark:bg-opacity-50
                    dark:text-white
                  "
                  @change="changeFile"
                />
                <Button
                  type="button"
                  color="danger"
                  @click="openFile"
                  :disabled="
                    !isError && !!file?.files && file?.files?.length > 0
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    ></path>
                  </svg>
                  <span class="ml-2">Subir archivo</span>
                </Button>
                <MessageError :show="isError" :text="messageUploadFile.value" />
                <template
                  v-if="!isError && !!file?.files && file?.files?.length > 0"
                >
                  <div
                    class="
                      w-full
                      sm:max-w-xs
                      bg-gray-100
                      dark:bg-gray-custom dark:bg-opacity-50
                      p-4
                      rounded-md
                      flex
                      items-center
                      justify-between
                      mt-3
                      relative
                      overflow-hidden
                    "
                  >
                    <template v-if="percentaje > 1">
                      <div class="w-full sm:max-w-xs absolute inset-0">
                        <div
                          :style="{ width: `${percentaje}%` }"
                          class="
                            bg-indigo-500
                            text-white
                            h-full
                            font-medium
                            text-base text-center
                            flex
                            items-center
                            justify-center
                            transition-all
                            duration-200
                            ease-linear
                          "
                        >
                          {{ percentaje }}%
                        </div>
                      </div>
                    </template>
                    <p class="text-base font-medium flex-shrink mr-2">
                      {{ file?.files[0].name }}
                    </p>
                    <svg
                      v-show="form.file"
                      @click="deleteFileUpload"
                      class="w-6 h-6 cursor-pointer text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end space-x-4">
          <Button type="submit" color="primary">Registrar</Button>
        </div>
      </div>
    </form>
  </div>
</template>
