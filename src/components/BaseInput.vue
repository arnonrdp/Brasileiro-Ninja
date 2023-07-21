<template>
  <form @submit.prevent="search" class="form-container">
    <input autofocus :placeholder="placeholder" v-model="value" v-maska="bindedObject" :data-maska="mask" />
    <button type="submit" :disabled="length ? value.length !== length : false">&#128269;</button>
  </form>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { vMaska } from 'maska'

const props = defineProps({
  modelValue: { type: String, required: true, default: '' },
  length: { type: Number, required: false },
  mask: { type: String, required: false },
  placeholder: { type: String, required: false, default: 'Pesquisar' }
})
const emit = defineEmits(['update:modelValue', 'search'])
const bindedObject = reactive({})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const search = () => {
  emit('search', bindedObject.unmasked)
}
</script>

<style scoped>
form {
  margin: 2rem auto;
  overflow: hidden;
  position: relative;
  width: 30rem;
}
input {
  border: 1px solid #ccc;
  border-radius: 24px;
  display: block;
  font-size: 1.2rem;
  height: 2.5rem;
  max-width: 90vw;
  text-align: center;
  transition: all 0.2s ease-in-out;
  width: 100%;
}

input:focus {
  border-width: 2px;
  border-color: hsla(160, 100%, 37%, 0.2);
  outline: none;
}

input::placeholder {
  opacity: 0.5;
}

button {
  background: hsla(160, 100%, 37%, 0.2);
  border-radius: 24px;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  height: 2.5rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 4.5rem;
}

@media (max-width: 760px) {
  .form-container {
    margin: 1rem auto;
    max-width: 100%;
    padding-left: 1rem;
  }

  button {
    width: 3rem;
  }
}
</style>
