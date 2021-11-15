<script setup lang="ts">
import { Head } from "@vueuse/head";

withDefaults(defineProps<{ title: string; description: string }>(), {
  title: "Inicio",
  description: "Bienvenidos al inicio de libro de reclamaciones",
});
</script>
<template>
  <div class="bg-gray-100 dark:bg-gray-custom h-screen">
    <Head>
      <title>LRV - {{ title }}</title>
      <meta name="description" :content="description" />
    </Head>
    <header>
      <slot name="header"></slot>
    </header>
    <main class="bg-gray-100 dark:bg-gray-custom">
      <slot></slot>
    </main>
  </div>
</template>
