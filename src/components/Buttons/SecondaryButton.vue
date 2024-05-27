<template>
  <button
    id="secondaryButton"
    :type="type"
    class="font-heading text-gray-600 hover:text-blue-500 focus:outline-none rounded-full px-5 py-4 text-sm leading-none cursor-pointer transition-all duration-300"
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
