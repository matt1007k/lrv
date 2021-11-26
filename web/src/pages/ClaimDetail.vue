<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import BaseLayout from "../components/layouts/BaseLayout.vue";
import ClaimItem from "../components/claims/ClaimItem.vue";

import { Claim } from "../store/modules/claim/state";
import { get } from "../utils/request";

const route = useRoute();

const claim = ref<Claim>({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  reference: "",
  department: "",
  province: "",
  district: "",
  type: "CLAIM",
  detail: "",
  order: "",
  file: "",
});

const message = ref<string>("");

const getDetail = async () => {
  const trackingCode = route.params.trackingCode
    ? route.params.trackingCode
    : null;
  try {
    const url = `/claims/detail/${trackingCode}`;
    const { data, status } = await get(url);
    if (status === 200) {
      message.value = "";
      claim.value = data;
    } else if (status === 404) {
      message.value = data.message;
    }
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getDetail());
</script>
<template>
  <BaseLayout
    title="Detalle de Registro"
    description="Detalle del Registro reciente en el libro de reclamaciones de la DREA"
  >
    <template v-slot:header>
      <div class="wrapper mt-0 md:mt-6">
        <div class="flex items-center">
          <router-link
            to="/"
            class="
              p-0
              md:p-2
              rounded-lg
              text-black
              hover:bg-gray-100
              dark:text-white dark:hover:bg-gray-secondary
              mr-1
              md:mr-2
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
              del registro
            </p>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <div
        class="
          wrapper
          my-0
          md:mt-8 md:-mb-8
          flex
          items-start
          justify-center
          bg-white
        "
      >
        <template v-if="Object.keys(claim).length !== 0 && message == ''">
          <ClaimItem :claim="claim" />
        </template>
        <template v-else>
          <p class="text-xl font-semibold text-gray-600 p-5">
            El reclamo o queja no existe
          </p>
        </template>
      </div>
    </template>
  </BaseLayout>
</template>
