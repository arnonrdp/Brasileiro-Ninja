import axios from 'axios'

const baseUrl = 'https://brasilapi.com.br/api'

export async function readBanks() {
  return await axios.get(`${baseUrl}/banks/v1`).then((response) => response.data)
}
