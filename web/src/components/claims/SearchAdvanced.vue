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
      <!-- <transition
        enter-active-class="transform-gpu"
        enter-class="opacity-0 -translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="absolute transform-gpu"
        leave-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-full"
      > -->
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
        <div
          class="
            fixed
            inset-0
            bg-black bg-opacity-20
            flex
            items-stretch
            justify-end
            z-90
          "
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
            v-on:blur="close"
          >
            <div class="flex justify-between items-center">
              <h4>Filtro avanzado</h4>
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
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between mt-12 space-x-4">
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
                    :disabled="disabled"
                  >
                    Aplicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { useField } from "vee-validate";
import { ref, watchEffect } from "vue";
const isContentShow = ref<boolean>(false);
defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const updateSearch = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};

// const { value: dateFrom } = useField("date_from");

const open = () => (isContentShow.value = true);
const close = () => (isContentShow.value = false);
const onFilter = () => console.log("etsst");

const disabled = ref<boolean>(true);

watchEffect(() => {
  // if (!dateFrom.value) {
  //   disabled.value = true;
  // }
  // disabled.value = false;
});
</script>
