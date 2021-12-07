<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue3-i18n";

import AnswerForm from "./AnswerForm.vue";

import { useStore } from "../../store";
import { AnswerGetterType } from "../../store/modules/answer/getters";
import { AnswerActionType } from "../../store/modules/answer/actions";

import { get } from "../../utils/request";
import { AnswerMutationType } from "../../store/modules/answer/mutations";
import { Answer } from "../../store/modules/answer/state";
import { getDateAndTimeInline } from "../../utils/dateFormat";
import { UserGettersTypes } from "../../store/modules/user/userGetter";

const store = useStore();
const route = useRoute();
const { t } = useI18n();

const trackingCode = route.params.trackingCode;

const getAll = async () => {
  store.commit(AnswerMutationType.SET_ANSWERS, []);
  try {
    const url = `/answers/${trackingCode}`;
    const { data, status } = await get(url);
    if (status === 200) {
      store.dispatch(AnswerActionType.GET_ANSWERS, data);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => getAll());

const answers = computed(() => store.getters[AnswerGetterType.GET_ANSWERS]);
const answersDesc = computed(() =>
  answers.value.sort((a, b) =>
    !!a.createdAt && !!b.createdAt && a.createdAt < b.createdAt ? 1 : -1
  )
);
const onNewAnswer = () => {
  getAll();
};

const isAuthenticated = computed(
  () => store.getters[UserGettersTypes.IS_AUTHENTICATED]
);
const auth = computed(() => store.getters[UserGettersTypes.GET_USER]);
</script>
<template>
  <div class="w-full mt-5 px-5 mb-16">
    <template v-if="isAuthenticated && auth.role === 'ADMIN'">
      <AnswerForm @onNewAnswer="onNewAnswer" />
    </template>
    <div class="mt-5">
      <h5>{{ t("Respuestas") }}</h5>
      <div class="mt-5 flex flex-col gap-2">
        <template v-if="!!answers && answers.length > 0">
          <div
            v-for="answer of answersDesc"
            :key="answer.id"
            class="
              border-2 border-gray-300
              dark:border-gray-secondary
              px-5
              py-4
              rounded-lg
            "
          >
            <h6 class="font-semibold text-black dark:text-white">
              {{ answer.text }}
            </h6>
            <p class="text-sm text-gray-500 dark:text-gray-300">
              {{ getDateAndTimeInline(answer.createdAt) }}
            </p>
          </div>
        </template>
        <template v-else>
          <p class="text-gray-500 text-base">
            {{ t("Sin respuestas registrados") }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
