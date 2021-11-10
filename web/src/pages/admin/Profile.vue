<script lang="ts" setup>
import AdminLayout from "../../components/layouts/AdminLayout.vue";
import FormPassword from "../../components/profile/FormPassword.vue";
import FormInfoUser from "../../components/profile/FormInfoUser.vue";
const title = "Perfil";
const description = "Administrar los datos de mi perfil";
</script>
<template>
  <AdminLayout :title="title" :description="description">
    <template v-slot:header>
      <div class="wrapper mt-0 md:mt-6">
        <div class="flex items-center">
          <router-link
            to="/admin"
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
            <h4>{{ title }}</h4>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:default>
      <div class="wrapper mt-8 mb-10 px-0 md:px-40">
        <FormInfoUser />
        <FormPassword />
      </div>
    </template>
  </AdminLayout>
</template>
