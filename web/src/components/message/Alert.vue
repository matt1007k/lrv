<script setup lang="ts">
withDefaults(defineProps<{ color: "info" | "success" | "danger" }>(), {
  color: "info",
});
</script>
<template>
  <div
    class="p-6 flex items-center gap-2 border rounded-md font-medium"
    :class="`${
      (color === 'info' &&
        'bg-blue-100 text-blue-700 border-blue-400 dark:border-blue-300') ||
      (color === 'success' &&
        'bg-green-100 text-green-700 border-green-400 dark:border-green-300') ||
      (color === 'danger' &&
        'bg-red-100 text-red-700 border-red-400 dark:border-red-300')
    }`"
  >
    <svg
      class="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      />
    </svg>
    <div>
      <slot />
    </div>
  </div>
</template>
