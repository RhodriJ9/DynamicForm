<template>
  <button
    :type="type"
    class="font-heading bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-full px-5 py-4 text-white text-sm leading-none cursor-pointer transition-all duration-300"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
})
</script>
