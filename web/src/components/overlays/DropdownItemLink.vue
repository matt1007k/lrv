<script setup lang="ts">
defineProps<{ href: string }>();
</script>
<template>
  <router-link
    :to="href"
    class="
      py-3
      px-3
      flex
      items-center
      hover:bg-gray-100
      dark:hover:bg-gray-light
      text-black
      dark:text-white
      cursor-pointer
      transition
      duration-200
      ease-out
    "
  >
    <slot />
  </router-link>
</template>
