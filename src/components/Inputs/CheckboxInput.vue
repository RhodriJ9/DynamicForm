<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="checkbox"
      @change="$emit('update:modelValue', $event.target.checked)"
      :aria-label="label"
      class="font-heading h-4 w-4 rounded border border-gray-300 bg-gray-50 text-blue-600 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
    <InputLabel class="ml-3" :label="label" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputLabel from './InputLabel.vue'

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
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  components: {
    InputLabel
  }
})
</script>
