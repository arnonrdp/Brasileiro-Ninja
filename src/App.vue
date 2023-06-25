<template>
  <header>
    <TheSidebar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheSidebar from './components/TheSidebar.vue'
</script>

<style scoped>
main {
  padding: 1rem;
  width: 100%;
}
</style>
