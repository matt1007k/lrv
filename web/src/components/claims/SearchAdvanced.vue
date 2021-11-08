<template>
  <div class="w-full md:w-3/5 mx-auto mt-8 md:mt-14">
    <div class="flex justify-center space-x-2">
      <div class="relative w-full md:w-3/5">
        <input
          :value="modelValue"
          @input="updateSearch"
          type="search"
          name="search"
          id="search"
          placeholder="Qué estas buscando?"
          class="
            py-3
            pl-12
            pr-3
            rounded-xl
            border-none
            focus:outline-none
            w-full
            placeholder-gray-500
            bg-white
            text-black
            dark:bg-gray-secondary
            dark:bg-opacity-50
            dark:placeholder-gray-400
            dark:text-white
            shadow-lg
          "
          autocomplete="off"
        />

        <svg
          class="w-6 h-6 text-gray-500 dark:text-gray-400 absolute top-3 left-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
          />
        </svg>
      </div>

      <div class="w-auto">
        <div
          class="
            p-3
            md:px-4
            flex
            items-center
            justify-center
            bg-green-200
            text-green-900
            rounded-xl
            cursor-pointer
            shadow-lg
          "
          @click="open"
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
              d="M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4"
            />
          </svg>
          <span class="hidden md:block ml-1 text-base font-semibold"
            >Filtrar</span
          >
        </div>
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            class="
              fixed
              inset-0
              bg-black bg-opacity-20
              flex
              items-stretch
              justify-end
            "
            style="z-index: 50"
            v-show="isContentShow"
          >
            <div
              class="
                bg-white
                dark:bg-gray-custom
                w-full
                sm:w-4/6
                md:w-3/12
                h-screen
                overflow-y-auto
                p-6
              "
              @blur="close"
            >
              <div class="flex justify-between items-center">
                <h5 class="text-black dark:text-white text-lg font-semibold">
                  Filtro avanzado
                </h5>
                <svg
                  class="
                    w-6
                    h-6
                    text-gray-400
                    hover:text-gray-500
                    dark:hover:text-gray-300
                    cursor-pointer
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="close"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div class="mt-8">
                <form @submit.prevent="onFilter">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                      <div class="flex flex-col">
                        <label
                          for="date_from"
                          class="
                            font-semibold
                            text-gray-600
                            dark:text-gray-400
                            mb-1
                          "
                          >Fecha de</label
                        >
                        <input
                          v-model="form.dateFrom"
                          type="date"
                          class="
                            py-2
                            px-3
                            rounded-lg
                            border-2 border-gray-300
                            dark:bg-gray-secondary
                            dark:bg-opacity-50
                            dark:placeholder-gray-400
                            dark:text-white
                            dark:border-gray-secondary
                            text-sm
                          "
                        />
                        <MessageError
                          :show="!!errors.dateFrom"
                          :text="errors.dateFrom"
                        />
                      </div>
                    </div>

                    <div class="col-span-1">
                      <div class="flex flex-col">
                        <label
                          for="date_from"
                          class="
                            font-semibold
                            text-gray-600
                            dark:text-gray-400
                            mb-1
                          "
                          >Fecha a</label
                        >
                        <input
                          v-model="form.dateTo"
                          type="date"
                          class="
                            py-2
                            px-3
                            rounded-lg
                            border-2 border-gray-300
                            dark:bg-gray-secondary
                            dark:bg-opacity-50
                            dark:placeholder-gray-400
                            dark:text-white
                            dark:border-gray-secondary
                            text-sm
                          "
                        />
                        <MessageError
                          :show="!!errors.dateTo"
                          :text="errors.dateTo"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex items-center justify-between mt-12 space-x-4"
                  >
                    <button
                      class="
                        py-3
                        px-4
                        font-semibold
                        bg-gray-100
                        hover:bg-gray-200
                        dark:bg-gray-secondary
                        dark:hover:bg-opacity-80
                        dark:text-gray-300
                        dark:hover:text-white
                        transition-all
                        duration-300
                        w-full
                        rounded-lg
                      "
                      type="button"
                      @click="clearForm"
                    >
                      Limpiar
                    </button>
                    <button
                      class="
                        py-3
                        px-4
                        font-semibold
                        bg-blue-500
                        hover:bg-blue-600
                        text-blue-50
                        disabled:bg-blue-300 disabled:cursor-pointer
                        w-full
                        rounded-lg
                      "
                      type="submit"
                      :disabled="isFormEmpty"
                    >
                      Aplicar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import MessageError from "../forms/MessageError.vue";
const isContentShow = ref<boolean>(false);
defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "onFilterAdvanced", value: string): void;
}>();

const updateSearch = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};

const open = () => (isContentShow.value = true);
const close = () => (isContentShow.value = false);

type FormState = {
  dateFrom: string;
  dateTo: string;
};

const form = reactive<FormState>({
  dateFrom: "",
  dateTo: "",
});

const errors = ref<Record<string, string>>({});

const isFormEmpty = computed(() => {
  if (!form.dateFrom) return true;
  if (!form.dateTo) return true;
  if (form.dateFrom > form.dateTo) {
    errors.value = { dateTo: "La (fecha a) debe ser mayor a la (fecha de)" };
    return true;
  }
  errors.value = {};
  return false;
});

const clearForm = () => {
  form.dateFrom = "";
  form.dateTo = "";
  errors.value = {};
  emit("onFilterAdvanced", "");
  close();
};

const onFilter = () => {
  const filterForm = `filter[rangeDate]=${form.dateFrom},${form.dateTo}`;
  emit("onFilterAdvanced", filterForm);
  close();
};
</script>
