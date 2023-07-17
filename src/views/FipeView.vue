<template>
  <div>
    <h1>Tabela Fipe</h1>
    <h2>Informações sobre Preço Médio de Veículos fornecido pela FIPE (Fundação Instituto de Pesquisas Econômicas)</h2>
  </div>

  <select>
    <option disabled selected value="">Selecione o mês</option>
    <option v-for="data in months" :key="data.code" :value="data.code">{{ data.month }}</option>
  </select>

  <br />
  <button @click="onChangeType('cars')">Carros</button>
  <button @click="onChangeType('motorcycles')">Motos</button>
  <button @click="onChangeType('trucks')">Caminhões</button>
  <br />
  <br />

  <select v-if="marcas.length" v-model="marca" @change="onChangeMarca">
    <option disabled selected value="">Selecione a marca</option>
    <option v-for="marca in marcas" :key="marca.code" :value="marca.code">{{ marca.name }}</option>
  </select>
  <br />
  <br />

  <select v-if="modelos.length" v-model="modelo" @change="onChangeModelo">
    <option disabled selected value="">Selecione o modelo</option>
    <option v-for="modelo in modelos" :key="modelo.code" :value="modelo.code">{{ modelo.name }}</option>
  </select>
  <br />
  <br />

  <select v-if="anos.length" v-model="ano">
    <option disabled selected value="">Selecione o ano</option>
    <option v-for="ano in anos" :key="ano.code">{{ ano.name }}</option>
  </select>
</template>

<script setup>
import { readFipeMonth, readFipeMarcas, readFipeModelos, readFipeAnos } from '@/model/services'
import { ref } from 'vue'

const months = ref([])
const tipo = ref('')
const marca = ref('')
const marcas = ref([])
const modelo = ref('')
const modelos = ref([])
const ano = ref('')
const anos = ref([])

async function onMonthReference() {
  await readFipeMonth().then((response) => {
    months.value = response
  })
}

async function onChangeType(veiculo) {
  tipo.value = veiculo
  await readFipeMarcas(veiculo).then((response) => {
    marcas.value = response
  })
}

async function onChangeMarca() {
  await readFipeModelos(tipo.value, marca.value).then((response) => {
    modelos.value = response
  })
}

async function onChangeModelo() {
  await readFipeAnos(tipo.value, marca.value, modelo.value).then((response) => {
    anos.value = response
  })
}

onMonthReference()
</script>

<style scoped></style>
