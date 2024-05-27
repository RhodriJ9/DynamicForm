<template>
  <select
    :id="id"
    v-model="internalValue"
    @change="updateValue"
    :aria-label="label"
    class="font-heading h-10 rounded-lg w-full max-w-full border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 outline-none ring-0 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-0"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue)

    watch(() => props.modelValue, (newValue) => {
      internalValue.value = newValue
    })

    const updateValue = (event:any) => {
      emit('update:modelValue', event.target.value)
    }

    return {
      internalValue,
      updateValue
    }
  }
})
</script>
