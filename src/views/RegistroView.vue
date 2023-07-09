<template>
  <h1>REGISTRO BR</h1>
  <h2>Avalia um dominio no registro.br</h2>
  <h3>Avalia o status de um dominio .br</h3>

  <BaseInput v-model="search" @search="onReadRegistro" />

  <table class="my-table">
    <thead v-if="Object.keys(registro).length > 0">
      <!-- codigo que faz com que a tabela so aparareça depois que a barra de pesquisa for preenchida -->
      <tr>
        <th>Status code</th>
        <th>Status</th>
        <th>fqdn</th>
        <th>Hosts</th>
        <!-- <th>Publication-status</th> -->
        <!-- <th>Expires at</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-if="Object.keys(registro).length > 0">
        <td>{{ registro.status_code }}</td>
        <td>{{ registro.status }}</td>
        <td>{{ registro.fqdn }}</td>
        <td>{{ registro.hosts }}</td>
        <!-- <td>{{ registro.publication - status }}</td> -->
        <!-- <td>{{ registro.expires - at }}</td> -->
        <!-- <td>{{ registros.fqdn }}</td> -->
      </tr>
    </tbody>
  </table>

  <!-- fazer o th com elementos da pagina brasil api -->
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
.my-table {
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
}
</style>
