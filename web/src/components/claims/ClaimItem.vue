<script setup lang="ts">
import { computed } from "vue";

import AnswerList from "./AnswerList.vue";

import { Claim } from "../../store/modules/claim/state";

import {
  getStatusHumanize,
  getAddressInline,
  getFileName,
} from "../../utils/claim";
import { getDateAndTimeInline } from "../../utils/dateFormat";

defineProps<{ claim: Claim }>();
</script>

<template>
  <div class="wrapper mt-8 mb-10 px-0 md:px-40">
    <div
      class="
        bg-white
        dark:bg-gray-secondary dark:border-gray-secondary dark:border-opacity-50
        shadow
        overflow-hidden
        sm:rounded-lg
      "
    >
      <div
        class="
          border-t border-gray-200
          dark:border-gray-custom dark:border-opacity-50
          px-6
          py-5
          mb-20
          md:mb-0
        "
      >
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <dt
              class="
                text-xs
                font-medium
                text-gray-500
                dark:text-gray-400
                uppercase
              "
            >
              Código de seguimiento
            </dt>
            <dd
              class="mt-1 text-lg font-semibold text-gray-900 dark:text-white"
            >
              {{ claim?.trackingCode }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Nombre completo
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              {{ claim?.fullName }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Celular
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              {{ claim?.phone }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Correo electrónico
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              {{ claim?.email }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dirección
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              {{ getAddressInline(claim) }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Detalle
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              {{ claim?.detail }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Orden
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              {{ claim.order }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Estado
            </dt>
            <dd
              class="mt-1 text-sm"
              :class="[
                claim.status === 'PENDING'
                  ? 'text-yellow-500 dark:text-yellow-300'
                  : 'text-green-500 dark:text-green-300',
              ]"
            >
              <span>{{ getStatusHumanize(claim.status) }}</span>
            </dd>
          </div>

          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fecha de registro
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              {{ getDateAndTimeInline(claim.createdAt) }}
            </dd>
          </div>

          <div class="sm:col-span-2" v-if="claim.file">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Archivo adjunto
            </dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">
              <ul
                role="list"
                class="
                  border border-gray-200
                  dark:border-gray-custom dark:border-opacity-50
                  rounded-md
                  divide-y divide-gray-200
                  dark:divide-gray-custom dark:divide-opacity-50
                "
              >
                <li
                  class="
                    pl-3
                    pr-4
                    py-3
                    flex
                    items-center
                    justify-between
                    text-sm
                  "
                >
                  <div class="w-0 flex-1 flex items-center">
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-2 flex-1 w-0 truncate">
                      {{ getFileName(claim) }}
                    </span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      :href="claim.file"
                      class="
                        font-medium
                        text-blue-600
                        hover:text-blue-500
                        dark:text-white dark:hover:text-gray-100
                        hover:underline
                      "
                      target="_blank"
                    >
                      Ver archivo
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <div class="sm:col-span-2" v-else>
            <p class="text-gray-500 dark:text-gray-400">
              No hay ningún archivo adjunto.
            </p>
          </div>
        </dl>
      </div>
    </div>
    <AnswerList />
  </div>
</template>
