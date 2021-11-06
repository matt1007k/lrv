<script setup lang="ts">
import Button from "../forms/Button.vue";

import { PaginationLinksType } from "../../store/types";

const props = defineProps<{ links: PaginationLinksType }>();
const emit = defineEmits<{
  (e: "onPage", page: number): void;
}>();
const onPage = (page: number) => {
  emit("onPage", page);
};

const getPages = () => {
  const thisPage = props.links.page || 1;
  const pagesToShow = 6;
  const pages: number[] = [];

  pages.push(thisPage);

  for (let i = 0; i < pagesToShow - 1; i++) {
    if (pages.length < pagesToShow) {
      if (Math.min.apply(null, pages) > 1) {
        pages.push(Math.min.apply(null, pages) - 1);
      }
    }
    if (pages.length < pagesToShow) {
      if (!!props.links.lastPage) {
        if (Math.max.apply(null, pages) < props.links?.lastPage) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
  }
  pages.sort((a, b) => a - b);

  return pages;
};
</script>
<template>
  <div class="mt-10 mb-10 md:mb-5 w-full">
    <nav class="flex items-center justify-between">
      <div class="w-full flex md:hidden items-center justify-between gap-x-2">
        <Button
          type="button"
          color="secondary"
          :disabled="links.page <= 1"
          @click="onPage(links.page - 1)"
          class="w-1/2"
          >Anterior</Button
        >
        <Button
          type="button"
          color="secondary"
          class="w-1/2"
          @click="onPage(links.page + 1)"
          :disabled="links.page > 1"
          >Siguiente</Button
        >
      </div>
      <div class="hidden md:flex items-center justify-between w-full">
        <div class="flex items-center">
          <p class="text-gray-500 dark:text-gray-300 font-medium">
            Total de registros:
            <span class="font-bold text-lg" v-text="links.total"></span>
          </p>
        </div>
        <div class="flex items-center gap-x-1">
          <template v-if="!!links.page">
            <Button
              type="button"
              color="secondary"
              :disabled="links.page <= 1"
              @click="onPage(links.page - 1)"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </Button>
          </template>
          <template v-for="(page, index) in getPages()" :key="index">
            <Button
              type="button"
              :color="`${page === links.page ? 'primary' : 'secondary'}`"
              @click="onPage(page)"
            >
              {{ page }}
            </Button>
          </template>
          <template v-if="!!links.page">
            <Button
              type="button"
              color="secondary"
              @click="onPage(links.page + 1)"
              :disabled="links.page > 1"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </Button>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>
