<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";

import Button from "../forms/Button.vue";
import ClaimSuccess from "./ClaimSuccess.vue";
import MessageError from "../forms/MessageError.vue";
import Alert from "../message/Alert.vue";

import { post } from "../../utils/request";

const route = useRoute();

const trackingCode = route.params.trackingCode;

const emit = defineEmits<{
  (e: "onNewAnswer"): void;
}>();

const message = reactive<{ text: string; type: "success" | "danger" }>({
  text: "",
  type: "success",
});

const errors = reactive<{ values: Record<string, string> }>({
  values: {},
});

const form = reactive<{ text: string; trackingCode: string; send: boolean }>({
  text: "",
  trackingCode: "",
  send: false,
});
const resetForm = () => {
  form.text = "";
  form.send = false;
};

const handleSubmit = async () => {
  try {
    const url = "/answers";
    const { data, status } = await post(url, {
      ...form,
      // @ts-ignore
      trackingCode: trackingCode,
    });
    if (status == 400) {
      message.text = data.message;
      message.type = "danger";
    } else if (status === 422) {
      message.text = "";
      errors.values = data.errors;
    } else if (status === 200) {
      message.text = "Respuesta registado con éxito";
      message.type = "success";
      resetForm();
      emit("onNewAnswer");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex items-center justify-between">
      <h5>Registrar respuesta</h5>
      <ClaimSuccess />
    </div>
    <Alert v-if="message.text != ''" :color="message.type">{{
      message.text
    }}</Alert>
    <div class="mt-5 mb-2">
      <textarea
        v-model="form.text"
        class="
          w-full
          h-24
          rounded-md
          border border-gray-300
          bg-white
          text-black
          placeholder-gray-500
          dark:border-gray-secondary
          dark:bg-gray-secondary
          dark:text-white
          dark:placeholder-gray-300
        "
        :class="{ 'border-red-500': !!errors.values.text }"
        placeholder="Ingresar la respuesta"
        required
      ></textarea>
      <MessageError :show="!!errors.values.text" :text="errors.values.text" />
    </div>
    <div class="flex items-center justify-between">
      <div class="relative flex items-start">
        <div class="flex items-center h-5">
          <input
            v-model="form.send"
            id="send"
            aria-describedby="send-description"
            name="send"
            type="checkbox"
            class="
              focus:ring-blue-500
              h-4
              w-4
              text-blue-600
              border-gray-300
              rounded
            "
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="send" class="font-medium text-gray-700 dark:text-gray-300"
            >Enviar correo</label
          >
        </div>
      </div>
      <Button type="submit" color="primary">Registrar</Button>
    </div>
  </form>
</template>
