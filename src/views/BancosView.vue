<template>
  <h1>Bancos</h1>
  <h2>Informações de todos os bancos do Brasil</h2>
  <BaseInput v-model.trim="search" />
  <div class="container">
    <table class="my-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Razão Social</th>
          <th>ISPB</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bank in computedBanks" :key="bank.code">
          <td>{{ bank.code }}</td>
          <td>{{ bank.name }}</td>
          <td>{{ bank.fullName }}</td>
          <td>{{ bank.ispb }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readBanks } from '@/model/services'
import { computed, onMounted, ref } from 'vue'

const banks = ref([])
const search = ref('')

onMounted(async () => {
  await readBanks().then((response) => {
    banks.value = response
  })
})

const computedBanks = computed(() => {
  return banks.value.filter((bank) => {
    return [bank.code, bank.name, bank.fullName, bank.ispb].some((value) => {
      return value?.toString()?.toLowerCase().includes(search.value.toLowerCase())
    })
  })
})
</script>

<style>
.container {
  max-width: 100%;
  padding: 0 1rem;
}
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

@media (max-width: 760px) {
  .container {
    padding: 0;
  }
}
</style>
