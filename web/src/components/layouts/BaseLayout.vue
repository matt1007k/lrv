<script setup lang="ts">
import NavbarPage from "./NavbarPage.vue";
import { Head } from "@vueuse/head";

withDefaults(defineProps<{ title: string; description: string }>(), {
  title: "LRV - Inicio",
  description: "Bienvenidos al inicio de libro de reclamaciones",
});

const year = new Date().getFullYear();
</script>
<template>
  <div class="bg-gray-100 dark:bg-gray-custom">
    <Head>
      <title>{{ title }}</title>
      <meta name="description" :content="description" />
    </Head>
    <NavbarPage />
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer
      class="
        w-full
        py-8
        flex
        items-center
        justify-center
        text-black
        dark:text-white
        bg-gray-100
        dark:bg-gray-custom
      "
    >
      <slot name="footer"
        ><p class="">LRV - {{ year }}</p></slot
      >
    </footer>
  </div>
</template>
