<template>
  <div>
    Register
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Field from '@/classes/Field.js'
import * as Yup from 'yup'

export default defineComponent({
  computed: {
    fields() {
      // This can be received via API
      return [
        new Field(0, 'Name', 'text', true, 'w-full', Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters')),
        new Field(0, 'Email', 'text', true, 'w-full', Yup.string().email('Valid email is required').required('Email is required')),
        new Field(0, 'Password', 'password', true, 'w-full', Yup.string().min(8, 'Password must be at least 8 characters').matches(/\d/, 'Password must contain at least one number').required('Password is required')),
      ];
    },
  }
})
</script>
