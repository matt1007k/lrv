<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import Dropdown from "../overlays/Dropdown.vue";
import DropdownItem from "../overlays/DropdownItem.vue";

import { get } from "../../utils/request";

type ResponseDataType = {
  total: number;
  totalClaims: number;
  totalComplains: number;
};

const type = ref<string | "CLAIM" | "COMPLAIN">("");
const sort = ref<string | "desc" | "asc">("desc");
const count = reactive<ResponseDataType>({
  total: 0,
  totalClaims: 0,
  totalComplains: 0,
});

const emit = defineEmits<{
  (e: "onFilter", type: string): void;
  (e: "onSort", sort: string): void;
}>();

const getCount = async () => {
  try {
    const url = "/claims/detail-count";
    const { data } = await get(url);
    const dataRes = data as ResponseDataType;
    count.total = dataRes.total;
    count.totalClaims = dataRes.totalClaims;
    count.totalComplains = dataRes.totalComplains;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => getCount());

const filterBy = (byType: string) => {
  type.value = byType;
  emit("onFilter", type.value);
};
const sortBy = (sortStr: string) => {
  sort.value = sortStr;
  emit("onSort", sort.value);
};
</script>
<template>
  <div
    class="
      my-0
      md:my-8
      flex flex-col
      sm:flex-row sm:justify-between
      justify-stretch
      items-start
      sm:items-center
    "
  >
    <div
      class="
        flex
        items-center
        my-6
        space-x-8
        font-semibold
        overflow-x-auto
        w-full
        md:w-auto
      "
    >
      <div
        class="
          flex
          items-center
          space-x-2
          group
          cursor-pointer
          pb-2
          transition-all
          duration-200
          ease-out
        "
        :class="{ 'border-b-4 border-blue-500': type == '' }"
        @click="filterBy('')"
      >
        <span
          :class="`${
            type === ''
              ? 'text-black dark:text-white'
              : 'text-gray-400 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white'
          }`"
          >Todos</span
        >
        <div
          class="py-1 px-2 rounded-lg"
          :class="`${
            type === ''
              ? 'bg-blue-200 text-blue-500 dark:text-blue-700'
              : 'bg-gray-200 dark:bg-gray-secondary text-gray-400'
          }`"
        >
          {{ count.total > 100 ? "99+" : count.total }}
        </div>
      </div>
      <div
        class="
          flex
          items-center
          space-x-2
          group
          cursor-pointer
          pb-2
          transition-all
          duration-200
          ease-out
        "
        :class="{ 'border-b-4 border-blue-500': type === 'CLAIM' }"
        @click="filterBy('CLAIM')"
      >
        <span
          :class="`${
            type === 'CLAIM'
              ? 'text-black dark:text-white'
              : 'text-gray-400 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white'
          }`"
          >Reclamos</span
        >
        <div
          class="py-1 px-2 rounded-lg"
          :class="`${
            type === 'CLAIM'
              ? 'bg-blue-200 text-blue-500 dark:text-blue-700'
              : 'bg-gray-200 dark:bg-gray-secondary text-gray-400'
          }`"
        >
          {{ count.totalClaims > 100 ? "99+" : count.totalClaims }}
        </div>
      </div>
      <div
        class="
          flex
          items-center
          space-x-2
          group
          cursor-pointer
          pb-2
          transition-all
          duration-200
          ease-out
        "
        :class="{ 'border-b-4 border-blue-500': type === 'COMPLAIN' }"
        @click="filterBy('COMPLAIN')"
      >
        <span
          :class="`${
            type === 'COMPLAIN'
              ? 'text-black dark:text-white'
              : 'text-gray-400 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white'
          }`"
          >Quejas</span
        >
        <div
          class="py-1 px-2 rounded-lg"
          :class="`${
            type === 'COMPLAIN'
              ? 'bg-blue-200 text-blue-500 dark:text-blue-700'
              : 'bg-gray-200 dark:bg-gray-secondary text-gray-400'
          }`"
        >
          {{ count.totalComplains > 100 ? "99+" : count.totalComplains }}
        </div>
      </div>
    </div>
    <div
      class="
        mb-4
        flex
        justify-between
        md:justify-end
        items-center
        w-full
        sm:w-auto
      "
    >
      <span class="font-semibold text-gray-400 mr-3">Ordernar por:</span>
      <Dropdown>
        <template v-slot:trigger>
          <div
            class="
              flex
              items-center
              cursor-pointer
              py-3
              px-3
              sm:py-3 sm:px-5
              bg-white
              hover:bg-gray-50
              dark:bg-gray-secondary
              dark:hover:bg-gray-secondary
              dark:hover:bg-opacity-80
              shadow-md
              rounded-lg
              md:rounded-full
            "
          >
            <svg
              class="w-6 h-6 text-black dark:text-white block md:hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4h13M3 8h9m-9 4h6m4 0 4-4m0 0 4 4m-4-4v12"
              />
            </svg>
            <span class="hidden md:flex items-center">
              <span class="font-medium mr-3 text-black dark:text-white">{{
                sort === "desc" ? "Recientes" : "Antiguos"
              }}</span>
              <svg
                class="w-6 h-6 text-gray-500 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </template>
        <template v-slot:content>
          <DropdownItem
            @click="sortBy('desc')"
            :class="{ 'bg-gray-100 dark:bg-gray-light': sort === 'desc' }"
            >Recientes</DropdownItem
          >
          <DropdownItem
            @click="sortBy('asc')"
            :class="{ 'bg-gray-100 dark:bg-gray-light': sort === 'asc' }"
            >Antiguos</DropdownItem
          >
        </template>
      </Dropdown>
    </div>
  </div>
</template>
