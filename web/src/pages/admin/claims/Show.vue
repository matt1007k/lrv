<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue3-i18n";

import AdminLayout from "../../../components/layouts/AdminLayout.vue";
import AnswerList from "../../../components/claims/AnswerList.vue";
import ClaimItem from "../../../components/claims/ClaimItem.vue";

import { Claim } from "../../../store/modules/claim/state";

import { get } from "../../../utils/request";
import {
  getAddressInline,
  getFileName,
  getStatusHumanize,
} from "../../../utils/claim";
import { getDateAndTimeInline } from "../../../utils/dateFormat";
import emitter from "../../../utils/timy-emitter";
import Button from "../../../components/forms/Button.vue";

const { t } = useI18n();
const route = useRoute();
const type = route.params.type;
const trackingCode = route.params.trackingCode;

const title = type === "claim" ? "del reclamo" : "de la queja";
const subtitle =
  type === "claim" ? "del reclamo regitrado." : "de la queja registrada.";

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

emitter.$on("onStatus", (status: "PENDING" | "SUCCESSFUL" | undefined) => {
  claim.value["status"] = status;
});

const getDetail = async () => {
  try {
    const url = `/claims/detail/${trackingCode}`;
    const { data, status } = await get(url);
    if (status === 404) {
      console.log(data.message);
    }
    claim.value = data;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getDetail());
const print = () => {
  window.print();
};
</script>
<template>
  <AdminLayout
    :title="`Detalle ${title}`"
    :description="`Mira los detalle ${subtitle}`"
  >
    <template v-slot:header>
      <div class="wrapper mt-0 md:mt-6 flex items-center justify-between">
        <div class="flex items-center">
          <router-link
            to="/admin"
            class="p-0 md:p-2 rounded-lg text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-secondary mr-1 md:mr-2 cursor-pointer"
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
            <h4>{{ t("Detalle") }}</h4>
            <p class="text-gray-500 dark:text-gray-400 text-base lowercase">
              {{ t(title) }}
            </p>
          </div>
        </div>
        <div>
          <Button @click="print()">
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              ></path>
            </svg>
            <span class="ml-2 hidden sm:flex">Imprimir</span>
          </Button>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <ClaimItem :claim="claim" />
    </template>
  </AdminLayout>
</template>
