<template>
  <input placeholder="Pesquisar" v-model="value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped>
input {
  display: block;
  font-size: 1.5rem;
  margin: 2rem auto;
  max-width: 90vw;
  width: 20rem;
}
</style>
