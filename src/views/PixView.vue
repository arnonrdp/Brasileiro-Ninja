<template>
  <h1>Pix</h1>
  <h2>Informações referentes ao PIX</h2>
  <h3>Retorna informações de todos os participantes do PIX no dia atual ou anterior</h3>
  <BaseInput v-model.trim="search" />
  <table class="my-table">
      <thead>
        <tr>
          <th>ISPB</th>
          <th>Nome</th>
          <th>Modalidade de participação </th>
          <th>Tipo de Participação</th>
          <th>Início de operação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instituicao in computedPix" :key="instituicao.code">
          <td>{{ instituicao.ispb }}</td>
          <td>{{ instituicao.nome }}</td>
          <td>{{ instituicao.modalidade_participacao}}</td>
          <td>{{ instituicao.tipo_participacao }}</td>
          <td>{{ instituicao.inicio_operacao }}</td></tr>
      </tbody>
    </table>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readPix } from '@/model/services'
import { computed, onMounted, ref } from 'vue'

const instituicoes = ref([])
const search = ref('')

onMounted(async () => {
  await readPix().then((response) => {
    instituicoes.value = response
  })
})

const computedPix = computed(() => {
  return instituicoes.value.filter((pix) => {
    return [pix.ispb, pix.nome, pix.modalidade_participacao, pix.tipo_participacao, pix.inicio_operacao].some((value) => {
      return value?.toString()?.toLowerCase().includes(search.value.toLowerCase())
    })
  })
})
</script>

<style>
  .my-table {
    width: 100%;
    border-collapse: collapse;
  }

  .my-table thead {
    background-color: #f5f5f5;
  }

  .my-table th,
  .my-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .my-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }


</style>
