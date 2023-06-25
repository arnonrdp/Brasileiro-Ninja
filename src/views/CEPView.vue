<template>
  <h1>Bancos</h1>
  <h2>Informações de todos os bancos do Brasil</h2>
  <BaseInput v-model="search" />
  <button @click="onReadCEP"></button>
  {{ address }}
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readCEP } from '@/model/services'
import { ref } from 'vue'

const address = ref([])
const search = ref('')

async function onReadCEP() {
  await readCEP(search.value).then((response) => {
    address.value = response
  })
}
</script>
