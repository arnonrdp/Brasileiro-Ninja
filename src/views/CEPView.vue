<template>
  <h1>CEP</h1>
  <h2>Informações referentes a CEPs</h2>
  <h3>
    A geolocalização dos CEPs estão suscetíveis a erros, pois as coordenadas são provindas do OpenStreetMap. Caso encontre algum erro você
    poderá corrigir no próprio OpenStreetMap que será refletido no CEP V2.
  </h3>
  <BaseInput :length="9" mask="#####-###" v-model="search" @search="onReadCEP" placeholder="Insira o CEP" />
  <div v-if="Object.keys(address).length > 0" class="card">
    <!-- PARTE DA FRENTE -->
    <div class="card-content">
      <div class="front">
        <div class="field">
          <div class="label">Cep:</div>
          <div class="value" v-maska="'#####-##'" data-maska="address.cep">{{ address.cep }}</div>
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
        <!-- Adicionar estilo -->
        <div class="back-address">
          <GoogleMap
            v-if="Object.keys(address.location.coordinates).length > 0"
            api-key="AIzaSyAF-u6-H1EXcUchy3j0sKxeVQykTwNhHbk"
            :center="center"
            :zoom="15"
          >
            <Marker :options="{ position: center }" />
          </GoogleMap>
          <p class="sem-coordenadas" v-else>Coordenadas Indisponíveis</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readCEP } from '@/model/services'
import { ref } from 'vue'
import { vMaska } from 'maska'
import { GoogleMap, Marker } from 'vue3-google-map'

const address = ref([])
const search = ref('')
const center = ref({})

async function onReadCEP(event) {
  await readCEP(event).then((response) => {
    address.value = response
    center.value = {
      lat: parseFloat(address.value.location.coordinates.latitude),
      lng: parseFloat(address.value.location.coordinates.longitude)
    }
    console.log(center.value)
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
  color: #333;
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
.back-address {
  width: 100%;
  height: 100%;
}

.sem-coordenadas {
  font-weight: 700;
  text-align: center;
  font-size: larger;
  margin-top: 110px;
}
</style>
