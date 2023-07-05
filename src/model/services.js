import axios from 'axios'

const baseUrl = 'https://brasilapi.com.br/api'

export async function readBanks() {
  return await axios.get(`${baseUrl}/banks/v1`).then((response) => response.data)
}

export async function readCEP(cep) {
  return await axios.get(`${baseUrl}/cep/v2/${cep}`).then((response) => response.data)
}

export async function readCNPJ(cnpj) {
  return await axios.get(`${baseUrl}/cnpj/v1/${cnpj}`).then((response) => response.data)
}

export async function readDDD(ddd) {
  return await axios.get(`${baseUrl}/ddd/v1/${ddd}`).then((response) => response.data)
}

export async function readHoliday(ano) {
  return await axios.get(`${baseUrl}/feriados/v1/${ano}`).then((response) => response.data)
}
