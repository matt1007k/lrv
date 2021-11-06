<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import AdminLayout from "../../../components/layouts/AdminLayout.vue";
import { Claim } from "../../../store/modules/claim/state";

const route = useRoute();
const type = route.params.type;
const id = route.params.id;

const claim = ref<Claim>();

const getDetail = () => {
  try {
    const url = `/detail/${id}`;
    console.log(id);
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getDetail());
</script>
<template>
  <AdminLayout
    :title="`LRV - Detalle ${type === 'claim' ? 'del reclamo' : 'de la queja'}`"
    :description="`Mira los detalle ${
      type === 'claim' ? 'del reclamo regitrado.' : 'de la queja registrada.'
    }`"
  >
    <template v-slot:header>
      <div class="wrapper mt-0 md:mt-6">
        <div class="flex items-center">
          <router-link
            to="/admin"
            class="
              p-2
              rounded-lg
              text-black
              hover:bg-gray-100
              dark:text-white dark:hover:bg-gray-secondary
              mr-2
              cursor-pointer
            "
          >
            <svg
              class="w-6 h-6"
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
          </router-link>
          <div>
            <h4>Detalle</h4>
            <p class="text-gray-500 dark:text-gray-400 text-base">
              {{ type === "claim" ? "del reclamo" : "de la queja" }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <h4>{{ claim.fullName }}</h4>
    </template>
  </AdminLayout>
</template>
