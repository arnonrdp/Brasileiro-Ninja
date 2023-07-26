<template>
  <h1>REGISTRO BR</h1>
  <h2>Avalia um dominio no registro.br</h2>
  <h3>Avalia o status de um dominio .br</h3>

  <BaseInput v-model="search" @search="onReadRegistro" />

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
          <div class="value">
            <div v-for="host in registro.hosts" :key="host">&bullet; {{ host }}</div>
          </div>
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
  height: auto;
  display: flex;
  margin: 0 auto;
  padding: 10px;
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
  color: black;
}
</style>
