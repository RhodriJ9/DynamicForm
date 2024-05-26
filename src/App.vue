<template>
  <div class="flex h-screen w-full">
    <div class="w-6/12 h-full flex items-center justify-center">
      <RegisterForm class="max-w-lg" />
    </div>
    <div class="w-6/12 h-full bg-gradient-to-br from-blue-400 to-blue-500"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RegisterForm from './components/Account/RegisterForm.vue';
export default defineComponent({
  components: {
    RegisterForm
  },
})
</script>
