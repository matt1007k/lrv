<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from "vue";

import AdminLayout from "../../components/layouts/AdminLayout.vue";
import SearchAdvanced from "../../components/claims/SearchAdvanced.vue";
import HeaderList from "../../components/claims/HeaderList.vue";
import Pagination from "../../components/navigations/Pagination.vue";

import Dropdown from "../../components/overlays/Dropdown.vue";
import DropdownItem from "../../components/overlays/DropdownItem.vue";
import DropdownItemLink from "../../components/overlays/DropdownItemLink.vue";

import { useStore } from "../../store";
import { ClaimActionType } from "../../store/modules/claim/actions";
import { ClaimGetterType } from "../../store/modules/claim/getters";

import { get } from "../../utils/request";
import { getDateInline } from "../../utils/dateFormat";
import { getStatusHumanize, getAddressInline } from "../../utils/claim";
import config from "../../utils/config";
import { listenerCount } from "process";

const store = useStore();

const queryParams = reactive({
  page: 1,
  type: "",
  orderBy: "desc",
  filter: "",
});

const search = ref<string>("");

watch(search, (search, prevSearch) => {
  getAll();
});

const getAll = async () => {
  try {
    const orType = queryParams.type != "" ? { type: queryParams.type } : {};
    const filter = queryParams.filter;

    const url = `/claims`;
    const { data } = await get(url, {
      page: queryParams.page,
      search: search.value,
      orderBy: queryParams.orderBy,
      perPage: 15,
      filter,
      ...orType,
    });
    store.dispatch(ClaimActionType.SET_ALL, data);
  } catch (error) {
    console.log(error);
  }
};
const onFilter = (byType: string) => {
  queryParams.type = byType;
  getAll();
};
const onSort = (sort: string) => {
  queryParams.orderBy = sort;
  getAll();
};
const onPage = (page: number) => {
  queryParams.page = page;
  getAll();
};
const onFilterAdvanced = (filter: string) => {
  queryParams.filter = filter;
  getAll();
};
const report = (type: string) => {
  const orType = queryParams.type != "" ? { type: queryParams.type } : {};

  const params: any = {
    search: search.value,
    orderBy: queryParams.orderBy,
    ...orType,
  };

  let qParams = new URLSearchParams(params).toString();

  if (queryParams.filter != "") {
    qParams += `&${queryParams.filter}`;
  }

  const url = config.API_URL_BASE + `/report/claims-${type}?${qParams}`;
  window.open(url, "_blank");
};
onMounted(async () => {
  await getAll();
});
const claims = computed(() => store.getters[ClaimGetterType.GET_ALL]);
const links = computed(() => store.getters[ClaimGetterType.GET_LINKS]);
</script>
<template>
  <AdminLayout
    title="Libro de reclamos"
    description="Mira todas los quejas y reclamos registrados."
  >
    <template v-slot:header>
      <div class="wrapper mt-0 md:mt-6">
        <div class="flex justify-between">
          <div>
            <h4>Libro</h4>
            <p class="text-gray-500 dark:text-gray-400 text-base">
              de reclamaciones
            </p>
          </div>

          <Dropdown>
            <template v-slot:trigger>
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
                  shadow-lg
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
                  py-3
                  rounded-full
                  bg-white
                  hover:bg-gray-50
                  dark:bg-gray-secondary dark:hover:bg-opacity-80
                  ml-0
                  md:ml-4
                  cursor-pointer
                  shadow-lg
                "
              >
                <span
                  class="font-semibold text-gray-600 dark:text-gray-200 mr-2"
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
            </template>
            <template v-slot:content>
              <DropdownItem @click="report('excel')">Excel</DropdownItem>
              <DropdownItem @click="report('pdf')">PDF</DropdownItem>
            </template>
          </Dropdown>
        </div>
        <SearchAdvanced v-model="search" @onFilterAdvanced="onFilterAdvanced" />
      </div>
    </template>
    <template v-slot:default>
      <div class="wrapper mt-6">
        <HeaderList @onFilter="onFilter" @onSort="onSort" />

        <div class="mb-10 z-10 h-full">
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
                  col-span-1
                "
              >
                # seguimiento
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
                  col-span-3
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

            <template v-if="!!claims && claims.length > 0">
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
                    md:col-span-1
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
                    md:col-span-3
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
                  <Dropdown>
                    <template v-slot:trigger>
                      <svg
                        class="
                          w-6
                          h-6
                          ml-4
                          opacity-100
                          md:opacity-0
                          text-gray-500
                          dark:text-gray-100
                          hover:text-black
                          dark:hover:text-white
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
                    </template>
                    <template v-slot:content>
                      <DropdownItemLink
                        :href="`/detail/${claim.type.toLocaleLowerCase()}/${
                          claim.id
                        }`"
                        >Ver detalle</DropdownItemLink
                      >
                    </template>
                  </Dropdown>
                </div>
              </div>
              <Pagination
                v-if="!!links.lastPage && links.lastPage > 1"
                :links="links"
                @onPage="onPage"
              />
            </template>
            <template v-else>
              <div class="py-8 flex items-center justify-center">
                <div class="flex flex-col items-center justify-center">
                  <img
                    src="../../assets/empty.png"
                    class="bg-transparent dark:bg-gray-100 rounded-full p-4"
                  />
                  <template v-if="search != '' && links.total == 0">
                    <h4
                      class="font-medium text-gray-400 dark:text-gray-300 mt-5"
                    >
                      Lo sentimos, sin resultados de búsqueda con:
                    </h4>
                    <h4 class="font-semibold text-gray-700 dark:text-white">
                      {{ search }}
                    </h4>
                  </template>
                  <template v-else>
                    <h4
                      class="font-medium text-gray-400 dark:text-gray-300 mt-5"
                    >
                      Lo sentimos, no hay ningún registro.
                    </h4>
                    <router-link
                      to="/"
                      class="
                        text-blue-500
                        dark:text-white
                        font-medium
                        text-lg
                        underline
                        mt-5
                      "
                      >Registrar queja</router-link
                    >
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>
