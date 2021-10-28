<script lang="ts" setup>
import Navbar from "./Navbar.vue";
import BottomNav from "./BottomNav.vue";
</script>

<template>
  <div class="h-screen bg-white dark:bg-gray-custom">
    <div
      class="absolute top-0 left-0 w-full overflow-hidden"
      style="height: 300px"
    >
      <div
        class="
          absolute
          inset-0
          h-full
          w-full
          z-10
          bg-gradient-to-t
          from-white
          to-transparent
          dark:from-gray-custom dark:to-transparent
        "
        style="backdrop-filter: blur(75px)"
      ></div>
      <img
        src="../../assets/Cube-2.png"
        alt="Cube 2"
        class="absolute top-0 right-0 w-full h-full"
      />
    </div>
    <Navbar />
    <BottomNav />
    <div class="relative z-10">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>
