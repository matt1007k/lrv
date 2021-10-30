<script lang="ts" setup>
interface Props {
  color?: string | "default" | "primary" | "danger";
}
withDefaults(defineProps<Props>(), {
  color: "default",
});
</script>
<template>
  <button
    class="
      px-5
      py-3
      text-center
      font-medium
      rounded-md
      cursor-pointer
      disabled:cursor-not-allowed
      flex
      items-center
    "
    :class="[
      {
        'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-400 disabled:text-gray-100':
          color === 'primary',
      },
      {
        'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-400 disabled:text-gray-100':
          color === 'danger',
      },
      {
        'bg-gray-200 hover:bg-gray-300 dark:bg-gray-custom dark:bg-opacity-50 dark:hover:bg-opacity-40 dark:text-white text-black disabled:bg-gray-400 disabled:text-gray-500':
          color === 'default',
      },
    ]"
  >
    <slot />
  </button>
</template>
