<template>
  <div>DynamicFields</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Field from '@/classes/Field.js';

export default defineComponent({
  props: {
    fields: Array<Field>
  },

  data() {
    return {
      stage: 0,
      formData: reactive(this.createFormData()),
    }
  },

  computed: {
    currentFields() {
      return this.fields?.filter(f => f.stage === this.stage);
    },

    totalStages() {
      return new Set(this.fields?.map(obj => obj['stage'])).size - 1;
    },

    finalStage() {
      return this.totalStages === this.stage;
    },
  },

  methods: {
    createFormData() {
      const data = {};
      this.fields?.forEach((field, index) => {
        data['field' + field.stage + index] = '';
      })
      return data;
    },
  }
})
</script>
