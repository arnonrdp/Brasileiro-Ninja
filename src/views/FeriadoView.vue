<template>
  <h1>Feriados Nacionais</h1>
  <h2>Lista os feriados nacionais de determinado ano</h2>
  <h3>Calcula os feriados móveis baseados na Páscoa e adiciona os feriados fixos</h3>

  <BaseInput :length="4" v-model="search" @search="onReadHoliday" />
  <div v-for="(month, i) in months" :key="i">
    {{ month[i + 1] }}
    <div v-for="(event, j) in events" :key="j">
      <div v-if="event.month == parseInt(Object.keys(month)[0])">
        {{ event.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readHoliday } from '@/model/services'
import { ref } from 'vue'

const ano = ref([])
const search = ref('')
const events = ref([])
const months = [
  { 1: 'Janeiro' },
  { 2: 'Fevereiro' },
  { 3: 'Março' },
  { 4: 'Abril' },
  { 5: 'Maio' },
  { 6: 'Junho' },
  { 7: 'Julho' },
  { 8: 'Agosto' },
  { 9: 'Setembro' },
  { 10: 'Outubro' },
  { 11: 'Novembro' },
  { 12: 'Dezembro' }
]

async function onReadHoliday(event) {
  await readHoliday(event).then((response) => {
    ano.value = response
    for (let item of ano.value) {
      let day = item.date.split('-')[2]
      let mes = item.date.split('-')[1]
      let name = item.name
      events.value.push({ month: parseInt(mes), name: { [day]: name } })
    }
    console.log(events.value)
  })
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.wrap {
  display: flex;
  /* padding: 0.8%; */
  justify-content: center;
  text-align: center;
}

.block-1 {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  text-align: center;
}

.month {
  background-color: #d9d9d9;
}
</style>
