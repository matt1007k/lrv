<template>
  <div class="form__group p-0 border-none bg-transparent">
    <template v-if="label">
      <label :for="forId" class="form__label font-medium mb-2">{{
        label
      }}</label>
    </template>
    <div class="relative">
      <input
        v-bind="attrs"
        class="
          relative
          py-3
          pl-4
          pr-10
          border-2 border-gray-300
          bg-white
          placeholder-gray-500
          text-black
          dark:border-opacity-30
          dark:bg-gray-custom
          dark:bg-opacity-60
          dark:placeholder-gray-300
          dark:text-white
          rounded-lg
          focus:outline-none focus:border-blue-500
          w-full
        "
        :class="`${!!error ? 'border-red-500 dark:border-opacity-100' : ''}`"
        :value="modelValue"
        @input="updateText"
      />
      <template v-if="inline || icon">
        <template v-if="icon === 'email'">
          <svg
            class="
              w-6
              h-6
              absolute
              top-3
              right-3
              text-gray-400
              dark:text-gray-300
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m3 8 7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
            />
          </svg>
        </template>
        <template v-if="icon === 'user'">
          <svg
            class="
              w-6
              h-6
              absolute
              top-3
              right-3
              text-gray-400
              dark:text-gray-300
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0 1 12 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
            />
          </svg>
        </template>
        <template v-if="icon === 'hash'">
          <svg
            class="
              w-6
              h-6
              absolute
              top-3
              right-3
              text-gray-400
              dark:text-gray-300
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            ></path>
          </svg>
        </template>
      </template>
    </div>
    <MessageError :show="!!error" :text="error && t(error)" />
  </div>
</template>

<script lang="ts">
// export default {
//   inheritAttrs: false,
// };
//
</script>

<script lang="ts" setup>
import { useAttrs } from "vue";
import { useI18n } from "vue3-i18n";

import MessageError from "./MessageError.vue";

withDefaults(
  defineProps<{
    modelValue: string;
    icon: string;
    inline: boolean;
    label?: string;
    error?: string;
  }>(),
  {
    inline: false,
    label: undefined,
  }
);
const emit = defineEmits(["update:modelValue"]);
const { t } = useI18n();

const updateText = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
const attrs = useAttrs();
const iconText = null;
const forId = attrs.id as string;
</script>
