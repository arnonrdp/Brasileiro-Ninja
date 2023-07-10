<template>
  <h1>CNPJ</h1>
  <h2>Busca dados de empresas por CNPJ</h2>
  <h3>
    O Cadastro Nacional da Pessoa Jurídica (CNPJ) é um número único que identifica uma pessoa jurídica e outros tipos de arranjo jurídico
    sem personalidade jurídica junto à Receita Federal.
  </h3>
  <BaseInput :length="18" mask="##.###.###/####-##" v-model="search" @search="onReadCNPJ" placeholder="Insira o CNPJ" />

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
        <div class="block-1 responsive">
          <p>NÚMERO DE INSCRIÇÃO</p>
          <p class="bold">
            {{ cnpj.cnpj }}
            <br />
            {{ cnpj.descricao_identificador_matriz_filial }}
          </p>
        </div>

        <div class="block-2 responsive">
          <p class="bold">COMPROVANTE DE INSCRIÇÃO E DE SITUAÇÃO CADASTRAL</p>
        </div>

        <div class="block-3 responsive">
          <p>DATA DE ABERTURA</p>
          <p class="bold">{{ cnpj.data_situacao_cadastral }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4 responsive">
          <p>NOME EMPRESARIAL</p>
          <p class="bold">{{ cnpj.razao_social }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-5 responsive">
          <p>TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)</p>
          <p class="bold">{{ cnpj.nome_fantasia }}</p>
        </div>
        <div class="block-6 responsive">
          <p>PORTE</p>
          <p class="bold">{{ cnpj.porte }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4 responsive">
          <p>CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL</p>
          <p class="bold">{{ cnpj.cnae_fiscal }} - {{ cnpj.cnae_fiscal_descricao }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4 responsive">
          <p class="bold">CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS</p>
          <p v-for="cnae in cnpj.cnaes_secundarios" :key="cnae.codigo" class="bold">{{ cnae.codigo }} - {{ cnae.descricao }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4 responsive">
          <p>CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA</p>
          <p class="bold">{{ cnpj.codigo_natureza_juridica }} - {{ cnpj.natureza_juridica }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-7 responsive">
          <p>LOGRADOURO</p>
          <p class="bold">{{ cnpj.logradouro }}</p>
        </div>

        <div class="block-8 responsive">
          <p>NÚMERO</p>
          <p class="bold">{{ cnpj.numero }}</p>
        </div>

        <div class="block-9 responsive">
          <p>COMPLEMENTO</p>
          <p class="bold">{{ cnpj.complemento || 'Não informado' }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-10 responsive">
          <p>CEP</p>
          <p class="bold">{{ cnpj.cep }}</p>
        </div>
        <div class="block-11 responsive">
          <p>BAIRRO/DISTRITO</p>
          <p class="bold">{{ cnpj.bairro }}</p>
        </div>

        <div class="block-12 responsive">
          <p>MUNICÍPIO</p>
          <p class="bold">{{ cnpj.municipio }}</p>
        </div>

        <div class="block-13 responsive">
          <p>UF</p>
          <p class="bold">{{ cnpj.uf }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-14 responsive">
          <p>ENDEREÇO ELETRÔNICO</p>
          <p class="bold">{{ cnpj.email || 'Não informado' }}</p>
        </div>

        <div class="block-15 responsive">
          <p>TELEFONE</p>
          <p class="bold">{{ cnpj.ddd_telefone_1 || 'Nào informado' }} / {{ cnpj.ddd_telefone_2 || 'Não informado' }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-4 responsive">
          <p>ENTE FEDERATIVO RESPONSÁVEL (EFR)</p>
          <p class="bold">{{ cnpj.ente_federativo_responsavel || 'Não informado' }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-16 responsive">
          <p>SITUAÇÃO CADASTRAL</p>
          <p class="bold">{{ cnpj.descricao_situacao_cadastral }}</p>
        </div>
        <div class="block-17 responsive">
          <p>DATA DA SITUAÇÃO CADASTRAL</p>
          <p class="bold">{{ cnpj.data_situacao_cadastral }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-18 responsive">
          <p>MOTIVO DE SITUAÇÃO CADASTRAL</p>
          <p class="bold">{{ cnpj.motivo_situacao_cadastral }}</p>
        </div>
      </div>

      <div class="wrap">
        <div class="block-16 responsive">
          <p>SITUAÇÃO ESPECIAL</p>
          <p class="bold">{{ cnpj.situacao_especial || 'Não informado' }}</p>
        </div>
        <div class="block-17 responsive">
          <p>DATA DA SITUAÇÃO ESPECIAL</p>
          <p class="bold">{{ cnpj.data_situacao_especial || 'Não informado' }}</p>
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

async function onReadCNPJ(event) {
  await readCNPJ(event).then((response) => {
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
  padding-top: 2.1875rem;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.25rem;
  margin-left: 8.75rem;
}

.title h1 {
  padding-bottom: 2.5rem;
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
  padding-left: 0.625rem;
}

.block-2 {
  border: 2px solid #000;
  font-size: 1.5625rem;
}

.block-3 {
  border: 2px solid #000;
  width: 30%;
  text-align: start;
  padding-left: 0.625rem;
}

.block-4 {
  border: 2px solid #000;
  width: 100%;
  text-align: start;
  padding-left: 0.625rem;
}

.block-5 {
  border: 2px solid #000;
  width: 92%;
  text-align: start;
  padding-left: 0.625rem;
}

.block-6 {
  border: 2px solid #000;
  width: 8%;
  text-align: start;
  padding-left: 0.625rem;
  margin-left: 1.25rem;
}

.block-7 {
  border: 2px solid #000;
  width: 50%;
  text-align: start;
  padding-left: 0.625rem;
  height: min-content;
}

.block-8 {
  border: 2px solid #000;
  width: 7%;
  text-align: start;
  margin: 0 20px;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}

.block-9 {
  border: 2px solid #000;
  width: 43%;
  text-align: start;
  padding-left: 0.625rem;
  height: auto;
}
.block-10 {
  border: 2px solid #000;
  width: 19.5%;
  text-align: start;
  padding-left: 0.625rem;
}

.block-11 {
  border: 2px solid #000;
  width: 30%;
  text-align: start;
  padding-left: 0.625rem;
  margin: 0 20px;
}

.block-12 {
  border: 2px solid #000;
  width: 43%;
  text-align: start;
  padding-left: 0.625rem;
}

.block-13 {
  border: 2px solid #000;
  width: 8%;
  text-align: start;
  padding-left: 0.625rem;
  margin-left: 1.25rem;
}

.block-14 {
  border: 2px solid #000;
  width: 49.4%;
  text-align: start;
  padding-left: 0.625rem;
  height: min-content;
  margin-right: 1.125rem;
}

.block-15 {
  border: 2px solid #000;
  width: 50.6%;
  text-align: start;
  padding-left: 0.625rem;
  height: min-content;
}

.block-16 {
  border: 2px solid #000;
  width: 70%;
  text-align: start;
  padding-left: 0.625rem;
  margin-right: 1.25rem;
}

.block-17 {
  border: 2px solid #000;
  width: 30%;
  text-align: start;
  padding-left: 0.625rem;
}

.block-18 {
  border: 2px solid #000;
  width: 100%;
  text-align: start;
  padding-left: 0.625rem;
  height: auto;
}

.bold {
  font-weight: 750;
}

@media (max-width: 820px) {
  .header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .header img {
    width: 30%;
    height: 30%;
  }

  .title {
    margin-left: 0;
  }

  .wrap {
    flex-direction: column;
    padding: 2%;
    /* width: fit-content; */
  }

  .responsive {
    width: 100%;
    margin: 0 0 2% 0;
  }
}
</style>

<!-- CNPJ TESTE -->
<!-- 30511238000142 -->
