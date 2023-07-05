<template>
  <h1>Feriados Nacionais</h1>
  <h2>Lista os feriados nacionais de determinado ano</h2>
  <h3>Calcula os feriados móveis baseados na Páscoa e adiciona os feriados fixos</h3>

  <BaseInput :length="4" v-model="search" @search="onReadHoliday" placeholder="Insira o ano desejado" />

  <div class="wrap row" v-if="Object.keys(ano).length > 0">
    <div v-for="(month, i) in months" :key="i" class="block-1">
      <p class="month">{{ month[i + 1] }}</p>

      <div v-for="(event, j) in events" :key="j">
        <div v-if="event.month == parseInt(Object.keys(month)[0])" class="holidays">
          {{ Object.keys(event.name)[0] }} - {{ Object.values(event.name)[0] }}
        </div>
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
    events.value = []

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
  padding: 0.6%;
  justify-content: center;
  text-align: center;
  flex-direction: row;
}
.row {
  flex-wrap: wrap;
}
.block-1 {
  flex-basis: 25%;
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  text-align: center;
}

.month {
  border-bottom: 1px solid #000;
  background-color: rgb(241, 118, 118);
  font-size: 18px;
  color: #fff;
}

.holidays {
  display: flex;
  justify-content: start;
  padding: 5px;
  font-size: 16px;
}
</style>
