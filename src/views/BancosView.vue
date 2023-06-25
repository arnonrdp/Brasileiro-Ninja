<template>
  <h1>Bancos</h1>
  <h2>Informações de todos os bancos do Brasil</h2>
  <BaseInput v-model.trim="search" />
  <table>
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
