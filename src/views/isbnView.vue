<template>
  <h1>ISBN</h1>
  <h2>
    Informações sobre livros publicados no Brasil (prefixo 65 ou 85) a partir do ISBN, um sistema internacional de identificação de livros
    que utiliza números para classificá-los por título, autor, país, editora e edição.
  </h2>
  <BaseInput v-model="search" @search="onreadISBN" placeholder="Insira o ISBN" />
  <div v-if="Object.keys(isbn).length > 0" class="card">
    <!-- PARTE DA FRENTE -->

    <div class="card-content">
      <div class="front">
        <div v-if="isbn.cover_url" class="field">
          <div class="value">
            <img :src="isbn.cover_url" alt="Cover Image" style="max-width: 800px; max-height: 700px" />
          </div>
        </div>
        <div v-if="isbn.title" class="field">
          <div class="label">Title:</div>
          <div class="value" style="font-weight: bold">{{ isbn.title }}</div>
        </div>

        <div v-if="isbn.subtitle" class="field">
          <div class="label">Subtitle</div>
          <div class="value">{{ isbn.subtitle }}</div>
        </div>

        <div v-if="isbn.isbn" class="field">
          <div class="label">ISBN:</div>
          <div class="isbn" style="font-weight: bold">{{ isbn.isbn }}</div>
        </div>

        <div v-if="isbn.nome_authors" class="field">
          <div class="label">Authors:</div>
          <div class="value">{{ isbn.nome_authors }}</div>
        </div>
        <div v-if="isbn.publisher" class="field">
          <div class="label">Publisher:</div>
          <div class="value">{{ isbn.publisher }}</div>
        </div>
        <div v-if="isbn.synopsis" class="field">
          <div class="label">Synopsis:</div>
          <div class="value" style="word-wrap: break-word">
            {{ isbn.synopsis }}
          </div>
        </div>
        <div v-if="isbn.dimensions" class="field">
          <div class="label">Dimensions:</div>
          <div class="value">
            <template v-if="isbn.dimensions">
              {{ 'Width: ' + isbn.dimensions.width + ' Height: ' + isbn.dimensions.height }}
            </template>
          </div>
        </div>
        <div v-if="isbn.year" class="field">
          <div class="label">Year:</div>
          <div class="value">{{ isbn.year }}</div>
        </div>
        <div v-if="isbn.format" class="field">
          <div class="label">Format:</div>
          <div class="value">{{ isbn.format }}</div>
        </div>
        <div v-if="isbn.page_count" class="field">
          <div class="label">Page count:</div>
          <div class="value">{{ isbn.page_count }}</div>
        </div>
        <div v-if="isbn.subject" class="field">
          <div class="label">Subjects:</div>
          <div class="value">
            <span v-for="subject in isbn.subjects" :key="subject" class="badge">{{ subject }}</span>
          </div>
        </div>
        <div v-if="isbn.location" class="field">
          <div class="label">Location:</div>
          <div class="value">{{ isbn.location }}</div>
        </div>
        <div v-if="isbn.cover_provider" class="field">
          <div class="label">Provider:</div>
          <div class="value">{{ isbn.provider }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { readISBN } from '@/model/services'
import { ref } from 'vue'

const isbn = ref([])
const search = ref('')

async function onreadISBN(event) {
  await readISBN(event).then((response) => {
    isbn.value = response
  })
}
</script>
<style scoped>
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  height: 1400px;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  perspective: 1000px;
  cursor: pointer;
  /* white-space: nowrap; */
  /* text-align: center; */
}

.card .card-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card .front {
  z-index: 2;
}

.field {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 100px;
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.value {
  /* margin: 8px; */
  font-size: 20px;
  margin-left: 18px;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 16px;
  background-color: #007bff;
  color: white;
  margin-right: 8px;
}
.isbn {
  margin-left: 20px;
}
.author {
  display: flex;
  margin-left: 380px;
}
</style>
