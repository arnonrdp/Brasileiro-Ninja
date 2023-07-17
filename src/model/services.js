import axios from 'axios'

const baseUrl = 'https://brasilapi.com.br/api'
const fipeBaseUrl = 'https://parallelum.com.br/fipe/api/v2'

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

export async function readFipeMonth() {
  return await axios.get(`${fipeBaseUrl}/references`)
}

export async function readFipeMarcas(veiculo) {
  return await axios.get(`${fipeBaseUrl}/${veiculo}/brands`).then((response) => response.data)
}

export async function readFipeModelos(veiculo, codigo) {
  return await axios.get(`${fipeBaseUrl}/${veiculo}/brands/${codigo}/models`).then((response) => response.data)
}

export async function readFipeAnos(veiculo, codigo, codigo_modelo) {
  return await axios.get(`${fipeBaseUrl}/${veiculo}/brands/${codigo}/models/${codigo_modelo}/years`).then((response) => response.data)
}

export async function readFipeResponse(veiculo, codigo, codigo_modelo, codigo_ano) {
  return await axios.get(`${fipeBaseUrl}/${veiculo}/brands/${codigo}/models/${codigo_modelo}/years/${codigo_ano}`)
}
