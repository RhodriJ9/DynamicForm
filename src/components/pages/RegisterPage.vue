<template>
  <SplitPage>
    <template #MainContent>
      <div class="bg-white rounded-lg p-7 px-5 shadow">
        <RegisterForm 
          class="max-w-lg" 
        />
      </div>
      <div class="flex justify-center mt-2">
        <SelectLanguage />
      </div>
    </template>
  </SplitPage>
</template>

<script>
import { defineComponent } from 'vue'
import SplitPage from '@/components/layouts/SplitPage.vue'
import RegisterForm from '@/components/account/RegisterForm.vue'
import SelectLanguage from '@/components/language/SelectLanguage.vue'

export default defineComponent({
  components: {
    RegisterForm,
    SelectLanguage,
    SplitPage
  }
})
</script>
