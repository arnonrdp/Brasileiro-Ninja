<template>
  <h1>CNPJ</h1>
  <h2>Busca dados de empresas por CNPJ</h2>
  <h3>
    O Cadastro Nacional da Pessoa Jurídica (CNPJ) é um número único que identifica uma pessoa jurídica e outros tipos de arranjo jurídico
    sem personalidade jurídica junto à Receita Federal.
  </h3>
  <BaseInput v-model="search" @search="onReadCNPJ" />

  <div class="card">
    <div class="header">
      <h1>REPÚBLICA FEDERATIVA DO BRASIL</h1>
      <img src="/src/assets/brasaooficialcolorido.png" alt="" />
      <h2>CADASTRO NACIONAL DA PESSOA JURÍDICA</h2>
    </div>

    <section class="information">
      <div class="wrap">
        <div class="block-1">
          <p>numero de inscrição</p>
          <p>{{ cnpj.cep }}</p>
        </div>

        <div class="block-2">
          <p>COMPROVANTE DE INSCRIÇÃO E DE SITUAÇÃO CADASTRAL</p>
        </div>

        <div class="block-3">
          <p>DATA DE ABERTURA</p>
          <p>28/08/2023</p>
        </div>
      </div>
    </section>
  </div>

  <p>{{ cnpj }}</p>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readCNPJ } from '@/model/services'
import { ref } from 'vue'

const cnpj = ref([])
const search = ref('')

async function onReadCNPJ() {
  await readCNPJ(search.value).then((response) => {
    cnpj.value = response
  })
}
</script>

<style scoped>
.card {
  background-color: #fff;
  border: 3px solid #000;
}

.header {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
}
.header img {
  width: 15%;
  height: 10%;
}
.wrap {
  display: flex;
  margin: 0;
  padding: 20px;
  justify-content: center;
  text-align: center;
}

.block-1 {
  width: 30%;
  border: 2px solid #000;
}

.block-2 {
  border: 2px solid #000;
  font-weight: bold;
  font-size: 25px;
}

.block-3 {
  border: 2px solid #000;
  width: 30%;
}
</style>

<!-- CNPJ TESTE -->
<!-- 30511238000142 -->
