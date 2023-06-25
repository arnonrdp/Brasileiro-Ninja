<template>
  <input autofocus placeholder="Pesquisar" v-model="value" />
</template>

<script setup>
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
  border: 1px solid #ccc;
  border-radius: 24px;
  display: block;
  font-size: 1.2rem;
  height: 2.5rem;
  margin: 2rem auto;
  max-width: 90vw;
  text-align: center;
  transition: all 0.2s ease-in-out;
  width: 25rem;
}

input:focus {
  border-width: 2px;
  border-color: hsla(160, 100%, 37%, 0.2);
  outline: none;
}

input::placeholder {
  opacity: 0.5;
}
</style>
