<template>
  <h1>CNPJ</h1>
  <h2>Busca dados de empresas por CNPJ</h2>
  <h3>
    O Cadastro Nacional da Pessoa Jurídica (CNPJ) é um número único que identifica uma pessoa jurídica e outros tipos de arranjo jurídico
    sem personalidade jurídica junto à Receita Federal.
  </h3>
  <BaseInput v-model="search" @search="onReadCNPJ" />
  <p>{{ cnpj }}</p>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readCNPJ } from '@/model/services'
import { ref } from 'vue'

const cnpj = ref([])
const search = ref('')

async function onReadCNPJ() {
  await readCNPJ(search.value).then((response) => {
    cnpj.value = response
  })
}
</script>

<style scoped></style>

<!-- CNPJ TESTE -->
<!-- 30511238000142 -->
