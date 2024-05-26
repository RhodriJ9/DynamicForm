<template>
  <div :id="id" class="font-heading text-sm font-bold capitalize">
    {{ label }}
  </div>
</template>

<script  lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: String,
    label: String
  }
})
</script>
