<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import AnswerForm from "./AnswerForm.vue";

import { useStore } from "../../store";
import { AnswerGetterType } from "../../store/modules/answer/getters";
import { AnswerActionType } from "../../store/modules/answer/actions";

import { get } from "../../utils/request";

const store = useStore();
const route = useRoute();

const claimId = route.params.id;

const getAll = async () => {
  try {
    const url = `/answers/${claimId}`;
    const { data, status } = await get(url);
    if (status === 200) {
      store.dispatch(AnswerActionType.GET_ANSWERS, data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => getAll());

const answers = computed(() => store.getters[AnswerGetterType.GET_ANSWERS]);
console.log(answers.value);
</script>
<template>
  <div class="w-full mt-5 px-5">
    <AnswerForm />
    <div class="mt-5">
      <h5>Respuestas</h5>
      <div class="mt-5">
        {{ JSON.stringify(answers) }}
        <template v-if="!!answers && answers.length > 0">
          <div
            v-for="answer of answers"
            :key="answer.id"
            class="border-2 border-gray-300 px-5 py-4 rounded-lg"
          >
            <h6>{{ answer.text }}</h6>
            <p>{{ answer.createdAt }}</p>
          </div>
        </template>
        <template v-else>
          <p class="text-gray-500 text-base">Sin respuestas registrados</p>
        </template>
      </div>
    </div>
  </div>
</template>
