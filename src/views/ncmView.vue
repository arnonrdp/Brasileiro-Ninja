<template>
  <h1>NCM</h1>
  <h2>Pesquisa por NCMs a partir de um código ou descrição.</h2>
  <BaseInput v-model="search" @search="onreadNCM" placeholder="Insira o Codigo do produto" />
  <div v-if="ncm.length > 0">
    <div v-for="(item, index) in ncm" :key="index" class="card">
      <div class="card-content">
        <div class="front">
          <div class="field">
            <div class="label">Codigo:</div>
            <div class="value" v-html="item.codigo"></div>
          </div>

          <div class="field">
            <div class="label">Descrição:</div>
            <div class="value" v-html="item.descricao"></div>
          </div>

          <div class="field">
            <div class="label">Data de início:</div>
            <div class="value" v-html="item.data_inicio"></div>
          </div>

          <div class="field">
            <div class="label">Data de fim:</div>
            <div class="value" v-html="item.data_fim"></div>
          </div>

          <div class="field">
            <div class="label">Tipo de ato:</div>
            <div class="value" v-html="item.tipo_ato"></div>
          </div>

          <div class="field">
            <div class="label">Número ato:</div>
            <div class="value" v-html="item.numero_ato"></div>
          </div>

          <div class="field">
            <div class="label">Ano de ato:</div>
            <div class="value" v-html="item.ano_ato"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readNCM } from '@/model/services'
import { ref } from 'vue'

const ncm = ref([])
const search = ref('')

async function onreadNCM(event) {
  const cleanedSearch = event.replace(/\D/g, '')

  await readNCM(cleanedSearch).then((response) => {
    ncm.value = response
    console.log(response)
  })
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
}

.card-container {
  display: flex;
  justify-content: center; /* Center the cards horizontally */
  align-items: center; /* Center the cards vertically */
  flex-wrap: wrap; /* Allow cards to wrap if necessary */
}

.card {
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid black; /* Add a black border around the card */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 600px; /* Set the maximum width of the card */
  width: 100%; /* Take up the available width */
  margin: 20px auto; /* Center the card horizontally and add spacing between cards */
  padding: 10px;
  text-align: left;
}

.front {
  display: flex;
  flex-direction: column; /* Arrange fields vertically */
}

.field {
  display: flex;
  margin-bottom: 10px;
}

.label {
  width: 100px;
  font-weight: bold;
  color: #555;
}

.value {
  flex: 1; /* Use the remaining space in the flex container */
  margin-left: 10px; /* Add space between label and value */
  font-size: 16px; /* Reduce font size for better organization */
}
</style>
