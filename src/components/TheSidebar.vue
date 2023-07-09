<template>
  <button v-if="!isSidebarOpen" class="sidebar-toggle" @click="toggleSidebar">
    <img alt="Menu" class="menu" src="/icons/menuSideBar.svg" />
  </button>
  <aside :class="{ 'sidebar-open': isSidebarOpen }">
    <div class="sidebar-content">
      <nav>
        <RouterLink to="/">
          <img alt="Logo" class="logo" src="/logo.svg" />
        </RouterLink>
        <RouterLink v-if="isSidebarOpen" to="/" @click="closeSidebar">Home</RouterLink>
        <RouterLink to="/bancos" @click="closeSidebar">Bancos</RouterLink>
        <RouterLink to="/cep" @click="closeSidebar">CEP</RouterLink>
        <RouterLink to="/cnpj" @click="closeSidebar">CNPJ</RouterLink>
        <RouterLink to="/ddd" @click="closeSidebar">DDD</RouterLink>
        <RouterLink to="/feriados" @click="closeSidebar">Feriados Nacionais</RouterLink>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<style scoped>
img {
  display: block;
  margin: 0 auto;
  padding: 1rem 0;
  width: 10rem;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  position: relative;
}

aside {
  background-color: rgb(250, 250, 250);
  height: 100vh;
  width: 15rem;
}

.sidebar-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  top: 0;
  right: 0;
  position: absolute;
}

.sidebar-open {
  width: 100%;
  background-color: rgb(250, 250, 250);
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

.close-sidebar {
  display: none;
  background: none;
  border: 1px solid #000;
  border-radius: 100%;
  cursor: pointer;
  position: absolute;
  bottom: -3.5rem;
  left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
}

.sidebar-open .close-sidebar {
  display: block;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (max-width: 760px) {
  .logo {
    display: none;
  }
  .sidebar-toggle {
    display: block;
  }

  aside {
    width: 100%;
    background-color: #fff;
    z-index: 10;
  }

  .sidebar-open {
    width: 100%;
    position: fixed;
    overflow-y: hidden;
  }

  nav {
    display: none;
  }

  .sidebar-open nav {
    display: flex;
  }

  .menu {
    width: 80px;
    height: 80px;
  }
}

.sidebar-content {
  display: flex;
  flex-direction: column;
}
</style>
