<template>
  <h1>CEP</h1>
  <h2>Informações referentes a CEPs</h2>
  <h3>
    A geolocalização dos CEPs estão suscetíveis a erros, pois as coordenadas são provindas do OpenStreetMap. Caso encontre algum erro você
    poderá corrigir no próprio OpenStreetMap que será refletido no CEP V2.
  </h3>
  <BaseInput v-model="search" @search="onReadCEP" />
  <div v-if="Object.keys(address).length > 0" class="card">
    <!-- PARTE DA FRENTE -->
    <div class="card-content">
      <div class="front">
        <div class="field">
          <div class="label">Cep:</div>
          <div class="value">{{ address.cep }}</div>
        </div>

        <div class="field">
          <div class="label">Estado:</div>
          <div class="value">{{ address.state }}</div>
        </div>

        <div class="field">
          <div class="label">Cidade:</div>
          <div class="value">{{ address.city }}</div>
        </div>

        <div class="field">
          <div class="label">Bairro:</div>
          <div class="value">{{ address.neighborhood }}</div>
        </div>

        <div class="field">
          <div class="label">Rua:</div>
          <div class="value">{{ address.street }}</div>
        </div>
      </div>

      <!-- PARTE DE TRAS -->
      <div class="back">
        <p>Hello World</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readCEP } from '@/model/services'
import { ref } from 'vue'

const address = ref([])
const search = ref('')

async function onReadCEP() {
  await readCEP(search.value).then((response) => {
    address.value = response
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
  height: 330px;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  perspective: 1000px;
  cursor: pointer;
  text-align: center;
}

.card .card-content {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.card:hover .card-content {
  transform: rotateY(180deg);
}

.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card .front {
  z-index: 2;
}

.card .back {
  transform: rotateY(180deg);
  background-color: #e0e0e0;
  color: #333;
  padding: 20px;
  z-index: 1;
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
