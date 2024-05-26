<template>
  <div class="w-full">
    <DynamicFields :fields="fields" @completed="submit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Field from '@/classes/Field.js'
import FieldDependancy from '@/classes/FieldDepandancy.ts'
import SelectOption from '@/classes/SelectOption.js'
import DynamicFields from '../DynamicFields.vue';
import * as Yup from 'yup'

export default defineComponent({
  components: {
    DynamicFields,
  },

  computed: {
    fields() {
      // This can be received via API
      return [
        new Field(0, 'Name', 'text', true, 'w-full', Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters')),
        new Field(0, 'Email', 'text', true, 'w-full', Yup.string().email('Valid email is required').required('Email is required')),
        new Field(0, 'Password', 'password', true, 'w-full', Yup.string().min(8, 'Password must be at least 8 characters').matches(/\d/, 'Password must contain at least one number').required('Password is required')),

        new Field(1, 'Choice of Service', 'select', true, 'w-full', Yup.string().required('Choice of Service is required'), [
          new SelectOption(0, 'Web Development'), 
          new SelectOption(1, 'Mobile Development'),
          new SelectOption(2, 'SEO Services'),
          new SelectOption(3, 'Other'),
        ]),
        new Field(1, 'Please specify other service', 'text', true, 'w-full', Yup.string().required('Please specify other service is required'), null, new FieldDependancy(0,3,'3')),
        new Field(1, 'Date of Birth', 'date', true, 'w-full', Yup.date()
          .transform((value, originalValue) => (originalValue === '' ? null : value))
          .nullable()
          .max(new Date(), 'Date of Birth must be a past date')),
        new Field(1, 'I agree to the Terms & Conditions', 'checkbox', true, 'w-full', Yup.string().required('I agree to the Terms & Conditions is required')),
      ];
    },
  },

  methods: {
    submit(formData) {
      console.log(formData)
      alert('Muito obrigado!');
    }
  }
})
</script>
