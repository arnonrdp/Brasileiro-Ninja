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
export async function readPix() {
  return await axios.get(`${baseUrl}/pix/v1/participants`).then((response) => response.data)
}
export async function readRegistro(dominio) {
  return await axios.get(`${baseUrl}/registrobr/v1/${dominio}`).then((response) => response.data)
}
export async function readCorretoras() {
  return await axios.get(`${baseUrl}/cvm/corretoras/v1`).then((response) => response.data)
}
export async function readTaxas() {
  return await axios.get(`${baseUrl}/taxas/v1`).then((response) => response.data)
}
export async function readISBN(isbn) {
  return await axios.get(`${baseUrl}/isbn/v1/${isbn}`).then((response) => response.data)
}
export async function readNCM(code) {
  return await axios.get(`${baseUrl}/ncm/v1?search=${code}`).then((response) => response.data)
}
