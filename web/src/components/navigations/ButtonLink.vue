<script lang="ts" setup>
interface Props {
  href: string;
  color?: string | "default" | "primary" | "danger" | "secondary";
  size?: string | "sm" | "lg" | "md";
}
withDefaults(defineProps<Props>(), {
  color: "default",
  size: "md",
});
</script>
<template>
  <router-link
    :to="href"
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
      justify-center
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
      {
        'bg-gray-100 hover:bg-gray-200 dark:bg-gray-secondary dark:bg-opacity-50 dark:hover:bg-opacity-40 dark:text-white text-black disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-light dark:disabled:text-gray-300 dark:disabled:hover:bg-gray-secondary':
          color === 'secondary',
      },
      {
        'shadow bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-700 dark:text-white text-black disabled:bg-gray-200 disabled:text-gray-300 dark:disabled:bg-gray-500 dark:disabled:text-gray-300 dark:disabled:hover:bg-gray-secondary':
          color === 'white',
      },
    ]"
  >
    <slot />
  </router-link>
</template>
