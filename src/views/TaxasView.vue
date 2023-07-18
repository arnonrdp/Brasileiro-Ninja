<template>
  <div class="title-container">
    <h1>TAXAS</h1>
    <h2>Taxas de juros e índices oficiais</h2>
  </div>
  <div class="container">
    <div class="chart-container">
      <canvas id="myChart" class="custom-chart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { readTaxas } from '@/model/services'
import { ref, onMounted } from 'vue'

const taxas = ref([])

onMounted(async () => {
  const response = await readTaxas()
  taxas.value = response
  createChart(response) // Chamando a função para criar o gráfico com os dados iniciais
})

import { Chart, CategoryScale, LinearScale, BarElement, BarController, Tooltip } from 'chart.js'

function createChart(data) {
  const labels = data.map((taxa) => taxa.nome)
  const values = data.map((taxa) => taxa.valor)

  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip)

  const ctx = document.getElementById('myChart').getContext('2d')

  const backgroundColors = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(0, 128, 0, 0.5)']
  const borderColors = ['rgba(139, 0, 0, 0.8)', 'rgba(0, 0, 139, 0.8)', 'rgba(0, 100, 0, 0.8)']

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Valores das Taxas',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          enabled: false,
          external: customTooltip
        }
      },
      onHover: handleHover,
      onLeave: handleLeave
    }
  })

  function handleHover(event, activeElements) {
    if (activeElements.length > 0) {
      chart.options.plugins.tooltip.enabled = true
      chart.options.plugins.tooltip.activeElements = activeElements
      chart.update()
    } else {
      handleLeave()
    }
  }

  function handleLeave() {
    chart.options.plugins.tooltip.enabled = false
    chart.update()
  }

  function customTooltip(context) {
    const index = context.tooltip.dataPoints[0].dataIndex
    const taxa = data[index]
    const value = taxa.valor

    return {
      raw: `Valor da taxa: ${value}`,
      formatter: () => `Valor da taxa: ${value}`
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-container {
  width: 800px;
  height: 500px;
  margin-top: 50px;
}

.custom-chart canvas {
  position: relative;
}

.custom-chart .chartjs-tooltip {
  opacity: 1;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 0;
  padding: 6px;
  font-size: 12px;
  font-family: Arial, sans-serif;
  transition: all 0.3s ease;
  pointer-events: none;
}

.custom-chart .chartjs-tooltip:not(.active) {
  opacity: 0;
  pointer-events: none;
}
</style>
