<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue3-i18n";

import { post, get } from "../../utils/request";
import emitter from "../../utils/timy-emitter";

const route = useRoute();
const { t } = useI18n();

const isSuccess = ref<boolean>(false);

const trackingCode = route.params.trackingCode;

const toggleStatus = async () => {
  isSuccess.value = !isSuccess.value;
  try {
    const url = `/claims/change-status/${trackingCode}`;
    const { data } = await post(url, { isSuccess: isSuccess.value });
    emitter.$emit("onStatus", data.status);
  } catch (error) {
    console.log(error);
  }
};
const getDetail = async () => {
  try {
    const url = `/claims/detail/${trackingCode}`;
    const { data, status } = await get(url);
    if (status === 404) {
      alert(data.message);
    }
    isSuccess.value = data.status === "SUCCESSFUL" ? true : false;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getDetail());
</script>
<template>
  <div class="flex items-center">
    <button
      @click="toggleStatus"
      type="button"
      class="
        relative
        inline-flex
        flex-shrink-0
        h-6
        w-11
        border-2 border-transparent
        rounded-full
        cursor-pointer
        transition-colors
        ease-in-out
        duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      "
      :class="`${
        isSuccess ? ' bg-blue-500' : 'bg-gray-200 dark:bg-gray-secondary'
      }`"
      role="switch"
      aria-checked="false"
      aria-labelledby="annual-billing-label"
    >
      <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
      <span
        aria-hidden="true"
        class="
          bg-white
          pointer-events-none
          inline-block
          h-5
          w-5
          rounded-full
          shadow
          transform
          ring-0
          transition
          ease-in-out
          duration-200
        "
        :class="`${isSuccess ? 'translate-x-full' : 'translate-x-0 '}`"
      ></span>
    </button>
    <span class="ml-3" id="annual-billing-label">
      <span class="text-sm font-medium text-gray-900 dark:text-gray-300">
        {{ t("Atendido") }}
      </span>
    </span>
  </div>
</template>
