<template>
  <h1>CEP</h1>
  <h2>Informações referentes a CEPs</h2>
  <h3>
    A geolocalização dos CEPs estão suscetíveis a erros, pois as coordenadas são provindas do OpenStreetMap. Caso encontre algum erro você
    poderá corrigir no próprio OpenStreetMap que será refletido no CEP V2.
  </h3>
  <BaseInput v-model="search" @search="onReadCEP" />
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
