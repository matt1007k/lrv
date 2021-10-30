<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from "vue";

import { useHead } from "@vueuse/head";

import AdminLayout from "../../components/layouts/AdminLayout.vue";
import SearchAdvanced from "../../components/claims/SearchAdvanced.vue";

import { get } from "../../utils/request";

import { useStore } from "../../store";

import { ClaimActionType } from "../../store/modules/claim/actions";
import { ClaimGetterType } from "../../store/modules/claim/getters";
import { Claim } from "../../store/modules/claim/state";

import { getDateInline } from "../../utils/dateFormat";

useHead({
  title: "LRV - Libro de reclamos",
  meta: [
    {
      name: "description",
      content: "Mira todas los quejas y reclamos de los personas.",
    },
  ],
});

const store = useStore();

const queryParams = reactive({
  page: 1,
});

const search = ref<string>("");

watch(search, (search, prevSearch) => {
  getAll();
});

const getAll = async () => {
  try {
    const url = "/claims";
    const { data } = await get(url, {
      ...queryParams,
      search: search.value,
      orderBy: "desc",
      perPage: 10,
      // type: "CLAIM",
    });
    store.dispatch(ClaimActionType.SET_ALL, data);
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => await getAll());
const claims = computed(() => store.getters[ClaimGetterType.GET_ALL]);
const links = computed(() => store.getters[ClaimGetterType.GET_LINKS]);

const getStatusHumanize = (status: string | undefined): string => {
  if (!!status) {
    if (status === "SUCCESSFUL") return "Atendido";
    else return "Pendiente";
  } else return "";
};

const getAddressInline = (claim: Claim): string => {
  return `${claim.department}, ${claim.district}, ${claim.address}`;
};
</script>
<template>
  <AdminLayout>
    <template v-slot:header>
      <div class="wrapper mt-0 md:mt-6">
        <div class="flex justify-between">
          <div>
            <h4>Reclamos</h4>
            <p class="text-gray-500 dark:text-gray-400 text-base">
              {{ links.total }} registros
            </p>
          </div>
          <div
            class="
              p-3
              flex
              md:hidden
              items-center
              justify-center
              bg-white
              text-black
              dark:bg-gray-secondary dark:text-white
              rounded-full
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
                d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6h.1a5 5 0 0 1 1 9.9M9 19l3 3m0 0 3-3m-3 3V10"
              />
            </svg>
          </div>
          <div
            class="
              hidden
              md:flex
              items-center
              justify-center
              px-5
              py-2
              rounded-full
              bg-white
              hover:bg-gray-50
              dark:bg-gray-secondary dark:hover:bg-opacity-80
              ml-0
              md:ml-4
              cursor-pointer
            "
          >
            <span class="font-semibold text-gray-600 dark:text-gray-200 mr-2"
              >Exportar</span
            >

            <svg
              class="w-6 h-6 text-gray-500 dark:text-gray-200"
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
          </div>
        </div>
        <SearchAdvanced v-model="search" />
      </div>
    </template>
    <template v-slot:default>
      <div class="wrapper mt-6">
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
          <div class="flex items-center my-6 space-x-8 font-semibold">
            <div class="flex items-center space-x-2 group cursor-pointer">
              <span class="text-black dark:text-white">Reclamos</span>
              <div class="py-1 px-2 bg-blue-200 text-blue-500 rounded-lg">
                12
              </div>
            </div>
            <div class="flex items-center space-x-2 group cursor-pointer">
              <span
                class="
                  text-gray-400
                  group-hover:text-black
                  dark:text-gray-400 dark:group-hover:text-white
                "
                >Quejas</span
              >
              <div
                class="
                  py-1
                  px-2
                  bg-gray-200
                  dark:bg-gray-secondary
                  text-gray-400
                  rounded-lg
                "
              >
                20
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
            <div
              class="
                flex
                items-center
                cursor-pointer
                py-3
                px-3
                sm:py-3 sm:px-5
                bg-gray-100
                hover:bg-gray-200
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
                <span class="font-semibold mr-3 text-black dark:text-white"
                  >Correo electrónico</span
                >
                <svg
                  class="w-6 h-6 text-gray-500 dark:text-gray-400"
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
          </div>
        </div>

        <div class="mb-10" style="min-height: 500px">
          <div class="w-full mt-6">
            <div
              class="
                hidden
                md:grid
                grid-cols-9
                gap-4
                py-3
                px-4
                border-b border-gray-300
                dark:border-gray-secondary dark:border-opacity-50
              "
            >
              <div
                class="
                  flex
                  font-medium
                  text-gray-400
                  uppercase
                  text-thead
                  col-span-2
                "
              >
                Nombre completo
              </div>
              <div
                class="
                  flex
                  font-medium
                  text-gray-400
                  uppercase
                  text-thead
                  col-span-2
                "
              >
                Código de seguimiento
              </div>
              <div
                class="
                  flex
                  font-medium
                  text-gray-400
                  uppercase
                  text-thead
                  col-span-1
                "
              >
                Num. celular
              </div>
              <div
                class="
                  flex
                  font-medium
                  text-gray-400
                  uppercase
                  text-thead
                  col-span-2
                "
              >
                Dirección
              </div>
              <div
                class="
                  flex
                  font-medium
                  text-gray-400
                  uppercase
                  text-thead
                  col-span-1
                "
              >
                Estado
              </div>
              <div
                class="
                  flex
                  font-medium
                  text-gray-400
                  uppercase
                  text-thead
                  col-span-1
                "
              >
                Fecha
              </div>
            </div>

            <template v-if="claims.length > 0">
              <div
                class="
                  w-full
                  grid grid-cols-3
                  sm:grid-cols-3
                  md:grid-cols-9
                  gap-4
                  items-center
                  justify-between
                  hover:bg-transparent
                  md:hover:bg-gray-100
                  md:dark:hover:bg-gray-secondary
                  md:dark:hover:bg-opacity-50
                  px-0
                  py-3
                  sm:px-4 sm:py-4
                  rounded-lg
                  cursor-default
                  group
                "
                v-for="claim of claims"
                :key="claim.id"
              >
                <div class="flex flex-col col-span-2">
                  <h6 class="text-black dark:text-white clamp-one-line">
                    {{ claim.fullName }}
                  </h6>
                  <p
                    class="
                      text-gray-500
                      dark:text-gray-400 dark:group-hover:text-white
                      text-thead
                      clamp-one-line
                    "
                  >
                    {{ claim.email }}
                  </p>
                </div>
                <div
                  class="
                    hidden
                    sm:flex
                    text-gray-500
                    dark:text-gray-400 dark:group-hover:text-white
                    text-sm
                    md:col-span-2
                  "
                >
                  <span class="clamp-one-line">
                    {{ claim.trackingCode }}
                  </span>
                </div>
                <div
                  class="
                    hidden
                    md:flex
                    text-gray-500
                    dark:text-gray-400 dark:group-hover:text-white
                    text-sm
                    md:col-span-1
                  "
                >
                  {{ claim.phone }}
                </div>
                <div
                  class="
                    hidden
                    md:flex
                    text-gray-500
                    dark:text-gray-400 dark:group-hover:text-white
                    text-sm
                    md:col-span-2
                  "
                >
                  <span class="clamp-one-line">
                    {{ getAddressInline(claim) }}
                  </span>
                </div>
                <div
                  class="hidden md:flex text-sm col-span-1"
                  :class="[
                    claim.status === 'PENDING'
                      ? 'text-yellow-500 dark:text-yellow-300'
                      : 'text-green-500 dark:text-green-300',
                  ]"
                >
                  <span>{{ getStatusHumanize(claim.status) }}</span>
                </div>
                <div
                  class="
                    flex
                    justify-end
                    md:justify-start
                    dark:text-gray-200
                    text-sm
                    col-span-1
                  "
                >
                  <span class="hidden md:block">
                    {{ getDateInline(claim.createdAt) }}
                  </span>
                  <svg
                    class="
                      w-6
                      h-6
                      ml-4
                      opacity-100
                      md:opacity-0
                      group-hover:opacity-100
                    "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>
