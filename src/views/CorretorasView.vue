<template>
  <h1>Retorna as corretoras nos arquivos da CVM.</h1>
  <table class="my-table">
    <thead>
      <tr>
        <th>corretoras</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="corretora in corretoras" :key="corretora">
        <td>
          {{
            corretora.nome_comercial.startsWith('-') || corretora.nome_comercial === '' ? corretora.nome_social : corretora.nome_comercial
          }}
        </td>
        <td>
          <p @click="openCorretora(corretora)">+</p>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-if="showPopup" class="section">
    <div>CNPJ: {{ infoPopup.cnpj }}</div>
    <div>Nome comercial: {{ infoPopup.nome_comercial }}</div>
  </div>
</template>

<script setup>
import { readCorretoras } from '@/model/services'
import { ref, onMounted } from 'vue'

const corretoras = ref([])
const showPopup = ref(false)
const infoPopup = ref([])

onMounted(() =>
  readCorretoras().then((response) => {
    corretoras.value = response
  })
)

function openCorretora(response) {
  showPopup.value = true
  infoPopup.value = response
  console.log(infoPopup)
}
</script>
<style scoped>
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

p {
  font-size: 30px;
  color: red;
  cursor: pointer;
}
.section {
  height: 400px;
  width: 300px;
  background-color: grey;
}
</style>
