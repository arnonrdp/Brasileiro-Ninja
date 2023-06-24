<template>
  <aside>
    <h2>Brasileiro Ninja</h2>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
h2 {
  padding: 1.5rem 0;
  text-align: center;
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
</style>
