<template>
  <h1>Retorna as corretoras nos arquivos da CVM.</h1>
  <table class="my-table">
    <thead>
      <tr>
        <th>corretoras</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="corretora in corretoras" :key="corretora">
        <td>
          {{
            corretora.nome_comercial.startsWith('-') || corretora.nome_comercial === '' ? corretora.nome_social : corretora.nome_comercial
          }}
        </td>
        <td>
          <p @click="openCorretora(corretora)">+</p>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- <div v-if="showPopup" class="section">
    <div class="data">

    </div>
  </div> -->
  <div>
    <button @click="showPopup = true">Mostrar Seção</button>
    <div v-if="showPopup" class="section" @click="sectionClicked = true">
      <div class="data">
        <div>Nome comercial: {{ infoPopup.nome_comercial || 'Não informado' }}</div>
        <div>Nome social: {{ infoPopup.nome_social || 'Não informado' }}</div>
        <div>CNPJ: {{ infoPopup.cnpj || 'Não informado' }}</div>
        <div>Bairo: {{ infoPopup.bairro || 'Não informado' }}</div>
        <div>Cep: {{ infoPopup.cep || 'Não informado' }}</div>
        <div>Codigo cvm: {{ infoPopup.codigo_cvm || 'Não informado' }}</div>
        <div>Complemento: {{ infoPopup.complemento || 'Não informado' }}</div>
        <div>Data inicio situacao: {{ infoPopup.data_inicio_situacao || 'Não informado' }}</div>
        <div>Data patrimonio liquido: {{ infoPopup.data_patrimonio_liquido || 'Não informado' }}</div>
        <div>Data registro: {{ infoPopup.data_data_registro || 'Não informado' }}</div>
        <div>Email: {{ infoPopup.email || 'Não informado' }}</div>
        <div>Logradouro: {{ infoPopup.logradouro || 'Não informado' }}</div>
        <div>Municipio: {{ infoPopup.municipio || 'Não informado' }}</div>
        <div>Status: {{ infoPopup.status || 'Não informado' }}</div>
        <div>Telefone: {{ infoPopup.telefone || 'Não informado' }}</div>
        <div>Type: {{ infoPopup.type || 'Não informado' }}</div>
        <div>UF: {{ infoPopup.uf || 'Não informado' }}</div>
        <div>Valor patrimonio liquido: {{ infoPopup.valor_patrimonio_liquido || 'Não informado' }}</div>
      </div>
    </div>
    <div class="overlay" v-if="showPopup" @click="hidePopup"></div>
  </div>
</template>

<script setup>
import { readCorretoras } from '@/model/services'
import { ref, onMounted } from 'vue'

const corretoras = ref([])
const showPopup = ref(false)
const sectionClicked = ref(false)
const infoPopup = ref([])

onMounted(() =>
  readCorretoras().then((response) => {
    corretoras.value = response
  })
)

function openCorretora(response) {
  showPopup.value = true
  infoPopup.value = response
  console.log(infoPopup)
}

const hidePopup = () => {
  if (!sectionClicked.value) {
    showPopup.value = false
  }
  sectionClicked.value = false
}
</script>
<style scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;
}

.my-table thead {
  background-color: #f5f5f5;
}

.my-table th,
.my-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.my-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

p {
  font-size: 30px;
  color: red;
  cursor: pointer;
}
.section {
  height: 500px;
  width: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* Certifique-se de que a seção esteja acima do overlay */
  pointer-events: none; /* Permite que o evento de clique seja passado para o overlay */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(90, 89, 89, 0.5); /* Defina a opacidade desejada aqui */
  z-index: 1;
}

.data {
  margin-left: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
