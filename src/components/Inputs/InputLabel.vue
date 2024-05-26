<template>
  <div :id="id" class="font-heading text-sm font-bold">
    <!-- We can render as HTML as it's not user generated -->
    <span v-html="label"></span>
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
