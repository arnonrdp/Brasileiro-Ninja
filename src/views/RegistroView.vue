<template>
  <h1>REGISTRO BR</h1>
  <h2>Avalia um dominio no registro.br</h2>
  <h3>Avalia o status de um dominio .br</h3>

  <BaseInput v-model="search" @search="onReadRegistro" />

  <!-- <table class="my-table">
    <thead v-if="Object.keys(registro).length > 0">  codigo que faz com que a tabela so aparareça depois que a barra de pesquisa for preenchida
      <tr>
        <th>Status code</th>
        <th>Status</th>
        <th>fqdn</th>
        <th>Hosts</th> -->
  <!-- <th>Publication-status</th> -->
  <!-- <th>Expires at</th> -->
  <!-- </tr>
    </thead>
    <tbody>
      <tr v-if="Object.keys(registro).length > 0">
        <td>{{ registro.status_code }}</td>
        <td>{{ registro.status }}</td>
        <td>{{ registro.fqdn }}</td>
        <td>{{ registro.hosts }}</td> -->

  <!-- <td>{{ registro.publication - status }}</td> -->
  <!-- <td>{{ registro.expires - at }}</td> -->
  <!-- <td>{{ registros.fqdn }}</td> -->
  <!-- </tr>
    </tbody>
  </table> -->

  <!-- fazer o th com elementos da pagina brasil api -->
  <div v-if="Object.keys(registro).length > 0" class="card">
    <!-- PARTE DA FRENTE -->
    <div class="card-content">
      <div class="front">
        <div class="field">
          <div class="label">Status code:</div>
          <div class="value">{{ registro.status_code }}</div>
        </div>

        <div class="field">
          <div class="label">Status:</div>
          <div class="value">{{ registro.status }}</div>
        </div>

        <div class="field">
          <div class="label">fqdn:</div>
          <div class="value">{{ registro.fqdn }}</div>
        </div>

        <div class="field">
          <div class="label">Hosts:</div>
          <div class="value">{{ registro.hosts }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readRegistro } from '@/model/services'
import { ref } from 'vue'

const registro = ref([])
const search = ref('')

async function onReadRegistro(event) {
  await readRegistro(event).then((response) => {
    registro.value = response
    console.log(registro.value)
  })
}
</script>

<style scoped>
/* .my-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
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
} */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  height: 330px;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  perspective: 1000px;
  cursor: pointer;
  text-align: center;
}
.field {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 100px;
  font-weight: bold;
  color: #555;
}
.value {
  margin: 8px 0;
  font-size: 20px;
}
</style>
