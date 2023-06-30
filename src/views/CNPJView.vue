<template>
  <h1>CNPJ</h1>
  <h2>Busca dados de empresas por CNPJ</h2>
  <h3>
    O Cadastro Nacional da Pessoa Jurídica (CNPJ) é um número único que identifica uma pessoa jurídica e outros tipos de arranjo jurídico
    sem personalidade jurídica junto à Receita Federal.
  </h3>
  <BaseInput v-model="search" @search="onReadCNPJ" />

  <div v-if="Object.keys(cnpj).length > 0" class="card">
    <div class="header">
      <img src="/src/assets/brasaooficialcolorido.png" alt="" />
      <div class="title">
        <h1 class="bold">REPÚBLICA FEDERATIVA DO BRASIL</h1>
        <h2 class="bold">CADASTRO NACIONAL DA PESSOA JURÍDICA</h2>
      </div>
    </div>

    <section class="information">
      <div class="wrap">
        <div class="block-1">
          <p>NÚMERO DE INSCRIÇÃO</p>
          <p class="bold">
            {{ cnpj.cnpj }}
            <br />
            {{ cnpj.descricao_identificador_matriz_filial }}
          </p>
        </div>

        <div class="block-2">
          <p class="bold">COMPROVANTE DE INSCRIÇÃO E DE SITUAÇÃO CADASTRAL</p>
        </div>

        <div class="block-3">
          <p>DATA DE ABERTURA</p>
          <p class="bold">{{ cnpj.data_situacao_cadastral }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4">
          <p>NOME EMPRESARIAL</p>
          <p class="bold">{{ cnpj.razao_social }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-5">
          <p>TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)</p>
          <p class="bold">{{ cnpj.nome_fantasia }}</p>
        </div>
        <div class="block-6">
          <p>PORTE</p>
          <p class="bold">{{ cnpj.porte }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4">
          <p>CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL</p>
          <p class="bold">{{ cnpj.cnae_fiscal }} - {{ cnpj.cnae_fiscal_descricao }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4">
          <p class="bold">CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS</p>
          <p v-for="cnae in cnpj.cnaes_secundarios" :key="cnae.codigo" class="bold">{{ cnae.codigo }} - {{ cnae.descricao }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4">
          <p>CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA</p>
          <p class="bold">{{ cnpj.codigo_natureza_juridica }} - {{ cnpj.natureza_juridica }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-7">
          <p>LOGRADOURO</p>
          <p class="bold">{{ cnpj.logradouro }}</p>
        </div>

        <div class="block-8">
          <p>NÚMERO</p>
          <p class="bold">{{ cnpj.numero }}</p>
        </div>

        <div class="block-9">
          <p>COMPLEMENTO</p>
          <p class="bold">{{ cnpj.complemento }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-10">
          <p>CEP</p>
          <P class="bold">{{ cnpj.cep }}</P>
        </div>
        <div class="block-11">
          <p>BAIRRO/DISTRITO</p>
          <p class="bold">{{ cnpj.bairro }}</p>
        </div>

        <div class="block-12">
          <p>MUNICÍPIO</p>
          <p class="bold">{{ cnpj.municipio }}</p>
        </div>

        <div class="block-13">
          <p>UF</p>
          <p class="bold">{{ cnpj.uf }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-14">
          <p>ENDEREÇO ELETRÔNICO</p>
          <p class="bold">{{ cnpj.email || 'Não informado' }}</p>
        </div>

        <div class="block-15">
          <p>TELEFONE</p>
          <p class="bold">{{ cnpj.ddd_telefone_1 }} / {{ cnpj.ddd_telefone_2 || 'Não informado' }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4">
          <p>ENTE FEDERATIVO RESPONSÁVEL (EFR)</p>
          <p class="bold">{{ cnpj.ente_federativo_responsavel || 'Não informado' }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-16">
          <p>SITUAÇÃO CADASTRAL</p>
          <p class="bold">{{ cnpj.descricao_situacao_cadastral }}</p>
        </div>
        <div class="block-17">
          <p>DATA DA SITUAÇÃO CADASTRAL</p>
          <P class="bold">{{ cnpj.data_situacao_cadastral }}</P>
        </div>
      </div>

      <div class="wrap">
        <div class="block-18">
          <p>MOTIVO DE SITUAÇÃO CADASTRAL</p>
          <p class="bold">{{ cnpj.motivo_situacao_cadastral }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-16">
          <p>SITUAÇÃO ESPECIAL</p>
          <p class="bold">{{ cnpj.situacao_especial || 'Não informado' }}</p>
        </div>
        <div class="block-17">
          <p>DATA DA SITUAÇÃO ESPECIAL</p>
          <P class="bold"></P>
        </div>
      </div>
    </section>
  </div>
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
body {
  margin: 0;
  padding: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.card {
  background-color: #fff;
  border: 3px solid #000;
}

.header {
  display: flex;
  flex-direction: row;
  text-align: center;
  font-weight: bold;
}
.header img {
  width: 15%;
  height: 10%;
  float: left;
}
.wrap {
  display: flex;
  padding: 0.8%;
  justify-content: center;
  text-align: center;
}

.block-1 {
  width: 30%;
  border: 2px solid #000;
  text-align: start;
  padding-left: 10px;
}

.block-2 {
  border: 2px solid #000;
  font-weight: bold;
  font-size: 25px;
}

.block-3 {
  border: 2px solid #000;
  width: 30%;
  text-align: start;
  padding-left: 10px;
}

.block-4 {
  border: 2px solid #000;
  width: 100%;
  text-align: start;
  padding-left: 10px;
}

.block-5 {
  border: 2px solid #000;
  width: 92%;
  text-align: start;
  padding-left: 10px;
}

.block-6 {
  border: 2px solid #000;
  width: 8%;
  text-align: start;
  padding-left: 10px;
  margin-left: 20px;
}

.block-7 {
  border: 2px solid #000;
  width: 50%;
  text-align: start;
  padding-left: 10px;
  height: min-content;
}

.block-8 {
  border: 2px solid #000;
  width: 7%;
  text-align: start;
  margin: 0 20px;
  padding-left: 10px;
}

.block-9 {
  border: 2px solid #000;
  width: 43%;
  text-align: start;
  padding-left: 10px;
  height: min-content;
}
.block-10 {
  border: 2px solid #000;
  width: 19.5%;
  text-align: start;
  padding-left: 10px;
}

.block-11 {
  border: 2px solid #000;
  width: 30%;
  text-align: start;
  padding-left: 10px;
  margin: 0 20px;
}

.block-12 {
  border: 2px solid #000;
  width: 43%;
  text-align: start;
  padding-left: 10px;
}

.block-13 {
  border: 2px solid #000;
  width: 8%;
  text-align: start;
  padding-left: 10px;
  margin-left: 20px;
}

.block-14 {
  border: 2px solid #000;
  width: 49.4%;
  text-align: start;
  padding-left: 10px;
  height: min-content;
  margin-right: 18px;
}

.block-15 {
  border: 2px solid #000;
  width: 50.6%;
  text-align: start;
  padding-left: 10px;
  height: min-content;
}

.block-16 {
  border: 2px solid #000;
  width: 70%;
  text-align: start;
  padding-left: 10px;
  margin-right: 20px;
}

.block-17 {
  border: 2px solid #000;
  width: 30%;
  text-align: start;
  padding-left: 10px;
}

.block-18 {
  border: 2px solid #000;
  width: 100%;
  text-align: start;
  padding-left: 10px;
  height: 70px;
}

.bold {
  font-weight: 800;
}
</style>

<!-- CNPJ TESTE -->
<!-- 30511238000142 -->
