<template>
  <aside>
    <img alt="Logo" class="logo" src="/logo.svg" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/bancos">Bancos</RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
img {
  display: block;
  margin: 0 auto;
  padding: 1rem 0;
  width: 10rem;
}

aside {
  background-color: rgb(250, 250, 250);
  height: 100vh;
  width: 15rem;
}

nav {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

nav a {
  border-bottom: 0.1px solid #ccc;
  color: #333;
  font-weight: bold;
  padding: 1rem;
  text-decoration: none;
}

nav a:first-child {
  border-top: 0.1px solid #ccc;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
