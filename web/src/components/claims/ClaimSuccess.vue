<script setup lang="ts">
import { ref } from "vue";

const isSuccess = ref<boolean>(false);

const toggleStatus = () => (isSuccess.value = !isSuccess.value);
</script>
<template>
  <div class="flex items-center">
    <button
      @click="toggleStatus"
      type="button"
      class="
        relative
        inline-flex
        flex-shrink-0
        h-6
        w-11
        border-2 border-transparent
        rounded-full
        cursor-pointer
        transition-colors
        ease-in-out
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      :class="`${isSuccess ? ' bg-blue-500' : 'bg-gray-200'}`"
      role="switch"
      aria-checked="false"
      aria-labelledby="annual-billing-label"
    >
      <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
      <span
        aria-hidden="true"
        class="
          bg-white
          pointer-events-none
          inline-block
          h-5
          w-5
          rounded-full
          shadow
          transform
          ring-0
          transition
          ease-in-out
          duration-200
        "
        :class="`${isSuccess ? 'translate-x-full' : 'translate-x-0 '}`"
      ></span>
    </button>
    <span class="ml-3" id="annual-billing-label">
      <span class="text-sm font-medium text-gray-900">Atendido </span>
    </span>
  </div>
</template>
