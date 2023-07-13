<template>
  <button v-if="!isSidebarOpen" class="sidebar-toggle" @click="toggleSidebar">
    <img alt="Menu" class="menu" src="/icons/menuSideBar.svg" />
  </button>
  <aside :class="{ 'sidebar-open': isSidebarOpen, 'sidebar-close': !isSidebarOpen }">
    <div class="sidebar-content">
      <nav>
        <RouterLink to="/" @click="closeSidebar"><img alt="Logo" class="logo" src="/logo.svg" /></RouterLink>
        <RouterLink to="/bancos" @click="closeSidebar">Bancos</RouterLink>
        <RouterLink to="/cep" @click="closeSidebar">CEP</RouterLink>
        <RouterLink to="/cnpj" @click="closeSidebar">CNPJ</RouterLink>
        <RouterLink to="/ddd" @click="closeSidebar">DDD</RouterLink>
        <RouterLink to="/feriados" @click="closeSidebar">Feriados Nacionais</RouterLink>
        <RouterLink to="/pix" @click="closeSidebar">Pix</RouterLink>
        <RouterLink to="/registro" @click="closeSidebar">Registro BR</RouterLink>
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
  position: fixed;
  left: 250px;
  width: 0;
  height: 100%;
  margin-left: -250px;
  background: white;
  transition: all 0.8s ease-in-out;
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
img {
  display: block;
  margin: 0 auto;
  padding: 1rem 0;
  width: 10rem;
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

@media (max-width: 820px) {
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

  .sidebar-close {
    position: fixed;
    left: 250px;
    width: 0;
    margin-left: 150px;
    background: rgb(251, 250, 250);
    transition: all 0.6s ease-out;
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
