<template>
  <div class="flex h-screen w-full">
    <div class="w-6/12 h-full flex items-center justify-center">
      <div>
        <SelectLanguage />
        <RegisterForm class="max-w-lg" />
      </div>
    </div>
    <div class="w-6/12 h-full bg-gradient-to-br from-blue-400 to-blue-500"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RegisterForm from './components/account/RegisterForm.vue';
import SelectLanguage from './components/language/SelectLanguage.vue'

export default defineComponent({
  components: {
    RegisterForm,
    SelectLanguage
  },
})
</script>
