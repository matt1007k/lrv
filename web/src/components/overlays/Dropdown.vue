<script setup lang="ts">
import { ref } from "vue";

const open = ref<boolean>(false);
</script>

<template>
  <div class="relative">
    <div @click="open = !open" class="cursor-pointer">
      <slot name="trigger" />
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="open"
        class="
          absolute
          z-50
          mt-2
          rounded-md
          shadow-lg
          w-52
          origin-top-right
          right-0
        "
        style="display: none"
        @click="open = false"
      >
        <div
          class="
            rounded-md
            ring-1 ring-black ring-opacity-5
            w-52
            bg-white
            dark:bg-gray-secondary
            py-1
          "
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>
