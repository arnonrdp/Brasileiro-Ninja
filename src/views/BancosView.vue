<template>
  <h1>Bancos</h1>
  <h2>Informações de todos os bancos do Brasil</h2>
  <BaseInput v-model="search"  />
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { ref } from 'vue'

const search = ref('')
</script>
