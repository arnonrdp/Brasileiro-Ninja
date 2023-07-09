<template>
  <h1>DDD</h1>
  <h2>Retorna estado e lista de cidades por DDD</h2>
  <h3>
    DDD significa Discagem Direta à Distância. É um sistema de ligação telefônica automática entre diferentes áreas urbanas nacionais. O DDD
    é um código constituído por 2 dígitos que identificam as principais cidades do país e devem ser adicionados ao nº de telefone,
    juntamente com o código da operadora.
  </h3>
  <BaseInput :length="2" v-model="search" @search="onReadDDD" placeholder="Insira o DDD" />

  <table v-if="Object.keys(ddd).length > 0" class="my-table">
    <thead>
      <tr>
        <th>Estado</th>
        <th>Cidades</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="state">{{ ddd.state }}</td>
        <td>
          <template v-for="city in ddd.cities.split(',')" :key="city">
            <td class="city">{{ city }}</td>
          </template>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- <p>{{ ddd }}</p> -->
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readDDD } from '@/model/services'
import { ref } from 'vue'

const ddd = ref([])
const search = ref('')

async function onReadDDD(event) {
  await readDDD(event).then((response) => {
    ddd.value = {
      state: response.state,
      cities: response.cities.join(', ')
    }
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

.my-table th {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.my-table td {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 28px;
}

.state {
  font-size: 20px;
  border: 1px solid #ddd;
}

.city {
  display: flex;
  flex-direction: column;
}
</style>
