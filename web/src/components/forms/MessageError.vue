<script setup lang="ts">
withDefaults(defineProps<{ show: boolean; text: string }>(), {
  text: "",
});
</script>
<template>
  <div v-if="show" class="text-red-500 font-medium">
    {{ text }}
  </div>
</template>
