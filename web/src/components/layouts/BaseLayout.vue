<template>
  <div>
    <header>
      headers
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"
        ><div class="text-white dark:text-gray-custom">ddd</div></slot
      >
    </footer>
  </div>
</template>
