<script lang="ts" setup>
import AdminLayout from "../../components/layouts/AdminLayout.vue";
</script>
<template>
  <AdminLayout>
    <template v-slot:header> headers </template>
    <template v-slot:default>
      <div>
        <h1 class="text-black dark:text-white">Other</h1>
      </div>
    </template>
  </AdminLayout>
</template>
