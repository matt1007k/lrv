<script setup lang="ts">
defineProps<{ href: string }>();
</script>

<template>
  <router-link
    :to="href"
    class="
      text-gray-400
      dark:text-gray-100 dark:hover:text-white
      font-semibold
      flex
      items-center
      space-x-2
      h-14
      transition
      duration-200
      ease-linear
      py-3
      px-4
      rounded-lg
    "
    active-class="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-secondary dark:hover:text-gray-100"
  >
    <slot />
  </router-link>
</template>
