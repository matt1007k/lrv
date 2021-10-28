<template>
  <div class="form__group mb-6 relative">
    <input
      type="password"
      placeholder="Contraseña"
      class="
        relative
        py-3
        pl-4
        pr-10
        border-2 border-gray-400
        bg-white
        placeholder-gray-500
        text-black
        dark:bg-gray-custom
        dark:bg-opacity-80
        dark:border-gray-custom
        dark:border-opacity-80
        dark:placeholder-gray-300
        dark:text-white
        rounded-lg
        focus:outline-none focus:border-blue-500
        w-full
      "
      ref="passwordInput"
      :value="modelValue"
      @input="updatePassword"
    />
    <template v-if="show">
      <svg
        class="
          w-6
          h-6
          absolute
          top-3
          right-3
          text-gray-400
          hover:text-black
          dark:text-gray-300 dark:hover:text-white
          cursor-pointer
        "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="hidden"
        @click="onHidden"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    </template>
    <template v-else>
      <svg
        class="
          w-6
          h-6
          absolute
          top-3
          right-3
          text-gray-400
          hover:text-black
          dark:text-gray-300 dark:hover:text-white
          cursor-pointer
        "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="show"
        @click="onShow"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 0 1 4.02 8.971m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88 6.59 6.59m7.532 7.532 3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 0 1-4.132 5.411m0 0L21 21"
        />
      </svg>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updatePassword = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};

const show = ref<boolean>(false);
const passwordInput = ref<HTMLInputElement>();

function onShow() {
  show.value = true;
  passwordInput.value?.setAttribute("type", "text");
}
function onHidden() {
  show.value = false;
  passwordInput.value?.setAttribute("type", "password");
}
</script>
