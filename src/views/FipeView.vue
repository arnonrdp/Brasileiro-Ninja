<template>
  <div>
    <h1>Tabela Fipe</h1>
    <h2>Informações sobre Preço Médio de Veículos fornecido pela FIPE (Fundação Instituto de Pesquisas Econômicas)</h2>
  </div>

  <div class="card">
    <div class="type_search">
      <button ref="btnPesquisaComum" @click="onClickShowInformation" :class="{ selected: showInformation }" class="btn-1">
        Pesquisa comum
      </button>
      <button ref="btnPesquisaCodigoFipe" @click="onClickShowInformation2" :class="{ selected: showInformation2 }" class="btn-2">
        Pesquisa por código Fipe
      </button>
    </div>
    <div class="wrap_content">
      <div class="type_btn">
        <h3>Selecione o tipo do veículo:</h3>
        <button @click="onChangeType('cars')" :class="{ selected: selectedType === 'cars' }">
          <img src="/icons/car-2897.svg" alt="Car" class="veiculo" />
        </button>
        <button @click="onChangeType('motorcycles')" :class="{ selected: selectedType === 'motorcycles' }">
          <img src="/icons/motorcycle-svgrepo-com.svg" alt="Motorcycle" class="veiculo" />
        </button>
        <button @click="onChangeType('trucks')" :class="{ selected: selectedType === 'trucks' }">
          <img src="/icons/truck-svgrepo-com.svg" alt="Truck" class="veiculo truck" />
        </button>
      </div>

      <div class="date">
        <h3>Sua pesquisa será realizada de acordo com o seguinte mês e ano de referência:</h3>
        <select class="select-btn-date" v-model="month">
          <option v-for="date in months" :selected="date.code == '299'" :key="date.code" :value="date.code">{{ date.month }}</option>
        </select>
      </div>

      <div class="line"></div>

      <div class="information" v-if="!showInformation2 && marcas.length">
        <h3>Informe primeiro a marca do veículo e depois o modelo e o ano, na ordem que desejar.</h3>
        <select v-model="marca" @change="onChangeMarca" class="select-btn">
          <option disabled selected value="">Selecione a marca</option>
          <option v-for="marca in marcas" :key="marca.code" :value="marca.code">{{ marca.name }}</option>
        </select>

        <select v-if="modelos.length" v-model="modelo" @change="onChangeModelo" class="select-btn">
          <option disabled selected value="">Selecione o modelo</option>
          <option v-for="modelo in modelos" :key="modelo.code" :value="modelo.code">{{ modelo.name }}</option>
        </select>

        <select v-if="modelos.length" v-model="ano" @change="loadModelsByAno" class="select-btn">
          <option disabled selected value="">Selecione o ano</option>
          <option v-for="ano in anos" :key="ano.code" :value="ano.code">{{ ano.name }}</option>
        </select>
      </div>

      <div class="information_2" v-if="showInformation2">
        <h3>Por favor, informe o Código Fipe e ano modelo do veículo que deseja pesquisar.</h3>
        <div class="info-2">
          <input placeholder="Digite o código Fipe" v-model="fipeCode" />
          <select class="select-info2" @click="loadFipeCodeYear" :disabled="!tipo || !fipeCode">
            <option disable selected value="">Selecione o ano do modelo</option>
            <option v-for="year in fipeCodeYear" :key="year.code" :value="year.code">{{ year.name }}</option>
          </select>
        </div>

        <div class="submit">
          <button type="submit" @click="onClickShowTable2">Pesquisar</button>
        </div>

        <table class="table" v-if="showTable2 && !showInformation">
          <tbody>
            <tr>
              <td class="no-border">Mês de Referência:</td>
              <td>{{ fipeInfoByCode.referenceMonth }}</td>
            </tr>
            <tr>
              <td class="no-border">Código Fipe:</td>
              <td>{{ fipeInfoByCode.codeFipe }}</td>
            </tr>
            <tr>
              <td class="no-border">Marca:</td>
              <td>{{ fipeInfoByCode.brand }}</td>
            </tr>
            <tr>
              <td class="no-border">Modelo:</td>
              <td>{{ fipeInfoByCode.model }}</td>
            </tr>
            <tr>
              <td class="no-border">Ano Modelo:</td>
              <td>{{ fipeInfoByCode.modelYear }}</td>
            </tr>
            <tr class="last">
              <td class="no-border">Preço Médio:</td>
              <td>{{ fipeInfoByCode.price }}</td>
            </tr>
          </tbody>
        </table>

        <div class="submit" v-if="showTable2">
          <button @click="resetPesquisa">Limpar Pesquisa</button>
        </div>
      </div>

      <div class="submit" v-if="anos.length && !showInformation2">
        <button type="submit" @click="onClickShowTable">Pesquisar</button>
      </div>

      <div class="line" v-if="showTable"></div>

      <table class="table" v-if="showTable && !showInformation2">
        <tbody>
          <tr>
            <td class="no-border">Mês de Referência:</td>
            <td>{{ fipe.referenceMonth }}</td>
          </tr>
          <tr>
            <td class="no-border">Código Fipe:</td>
            <td>{{ fipe.codeFipe }}</td>
          </tr>
          <tr>
            <td class="no-border">Marca:</td>
            <td>{{ fipe.brand }}</td>
          </tr>
          <tr>
            <td class="no-border">Modelo:</td>
            <td>{{ fipe.model }}</td>
          </tr>
          <tr>
            <td class="no-border">Ano Modelo:</td>
            <td>{{ fipe.modelYear }}</td>
          </tr>
          <tr class="last">
            <td class="no-border">Preço Médio:</td>
            <td>{{ fipe.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {
  readFipeMonth,
  readFipeMarcas,
  readFipeModelos,
  readFipeAnos,
  readFipeModelsByYears,
  readFipeInfo,
  readYearsByFipeCode,
  readFipeInfoCode
} from '@/model/services'
import { onMounted, ref } from 'vue'

const month = ref({ code: '299', month: 'julho/2023' })
const months = ref([])
const tipo = ref('')
const marca = ref('')
const marcas = ref([])
const modelo = ref('')
const modelos = ref([])
const ano = ref('')
const anos = ref([])
const fipe = ref([])
const fipeCode = ref('')
const fipeCodeYear = ref([])
const fipeInfoByCode = ref([])
const showInformation = ref(true)
const showInformation2 = ref(false)
const showTable = ref(false)
const showTable2 = ref(false)
const selectedType = ref('')

function onClickShowTable2() {
  loadFipeInfoByCode()
  showTable2.value = true
}

function onClickShowTable() {
  loadFipeInfo()
  showTable.value = true
}

function onClickShowInformation() {
  showInformation.value = true
  showInformation2.value = false
}

function onClickShowInformation2() {
  showInformation.value = false
  showInformation2.value = true
}

onMounted(async () => {
  await readFipeMonth().then((response) => {
    months.value = response
  })
})

async function onChangeType(veiculo) {
  tipo.value = veiculo
  selectedType.value = veiculo
  await readFipeMarcas(veiculo).then((response) => {
    marcas.value = response
  })
}

async function onChangeMarca() {
  await readFipeModelos(tipo.value, marca.value).then((response) => {
    modelos.value = response.modelos
    anos.value = response.anos
    console.log(response)
  })
}

async function onChangeModelo() {
  await readFipeAnos(tipo.value, marca.value, modelo.value).then((response) => {
    anos.value = response
    console.log(response)
  })
}

async function loadModelsByAno() {
  await readFipeModelsByYears(tipo.value, marca.value, ano.value).then((response) => {
    modelos.value = response.data
  })
}

async function loadFipeInfo() {
  console.log(month.value)
  await readFipeInfo(tipo.value, marca.value, modelo.value, ano.value, month.value).then((response) => {
    fipe.value = response.data
  })
}

async function loadFipeCodeYear() {
  await readYearsByFipeCode(tipo.value, fipeCode.value).then((response) => {
    fipeCodeYear.value = response
  })
}

async function loadFipeInfoByCode() {
  const infoCode = fipeCodeYear.value[0].code
  await readFipeInfoCode(tipo.value, fipeCode.value, infoCode).then((response) => {
    fipeInfoByCode.value = response
  })
}
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f2f4f7;
}
.wrap_content {
  padding: 20px;
}

.type_search {
  padding-bottom: 15px;
}
.type_search button {
  height: 49px;
  margin: 0 auto;
  margin-left: inherit;
  background: #fff;
  border-radius: 0 0 20px 20px;
  border: none;
  padding: 0 10px;
  cursor: pointer;
  background-color: #fff;
  color: #becdda;
  font-size: 15px;
  font-weight: 550;
}

.type_search button:hover {
  background-color: #becdda;
  color: black;
}

.type_search button.selected {
  background-color: #becdda;
  color: black;
}

.btn-1 {
  width: 40%;
}

.btn-2 {
  width: 60%;
}

.type_btn button {
  margin: 8px;
  padding: 5px 10px;
  font-size: 16px;
  background-color: #f2f4f7;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.type_btn button:hover {
  background-color: #a5b8cb;
}

.type_btn button.selected {
  background-color: #a5b8cb;
}
.select-btn-date {
  width: 30%;
  padding: 8px;
  margin: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f4f4f4;
  color: #54616e;
  outline: none;
  cursor: pointer;
}

.select-btn {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 80%;
  padding: 8px;
  margin: 15px 60px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f4f4f4;
  color: #54616e;
  outline: none;
  cursor: pointer;
}

.information {
  margin-top: 20px;
}

h3 {
  padding: 5px;
  margin-left: 5px;
}

.submit button {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  padding: 10px;
  margin: 30px auto;
  font-size: 16px;
  background: 0 0;
  color: #3c3c3c !important;
  border-radius: 5px;
  border: 2px solid #3c3c3c;
  cursor: pointer;
  font-weight: 550;
}

.veiculo {
  width: 50px;
}

.truck {
  padding-bottom: 8px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #c2e1f6;
  text-indent: initial;
}

table td {
  padding: 10px 15px;
  text-align: left;
  border-bottom: 1px solid #33a9f4;
  background: url(https://www.fipe.org.br/Content/img/indices/bg_td.jpg) left bottom no-repeat;
}

table td.no-border,
table tr.last td.no-border {
  background: 0 0;
}

table tr.last {
  background: #33a9f4;
}

table tr.last td {
  background: url(https://www.fipe.org.br/Content/img/bg_td_last.jpg) left bottom no-repeat;
}

input {
  width: 100%;
  height: auto;
  margin: 15px auto;
  border: 0;
  font-family: Arial;
  font-size: 14px;
  color: #3c3c3c;
  padding: 8px;
}

.select-info2 {
  width: 100%;
  padding: 8px;
  margin: 15px 30px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f4f4f4;
  color: #54616e;
  outline: none;
  cursor: pointer;
}

.info-2 {
  display: flex;
  margin-left: 10px;
}

.line {
  width: 100%;
  height: 2px;
  margin: 10px 0 !important;
  position: relative;
  background: url(https://www.fipe.org.br/Content/img/modulos/line.png);
}
</style>
