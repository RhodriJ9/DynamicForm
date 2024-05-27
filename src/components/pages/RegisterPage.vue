<template>
  <SplitPage>
    <template #MainContent>
      <div class="text-center mb-12 -mt-24">
        <div class="text-white text-3xl font-bold">
          {{ title }}
        </div>
        <div class="text-white opacity-80 text-lg mt-2">
          {{ subtitle }}
        </div>
      </div>
      <div class="bg-white rounded-lg p-7 px-5 shadow">
        <RegisterForm class="max-w-lg" @stage="setStage" />
      </div>
      <div class="flex justify-center mt-4">
        <SelectLanguage />
      </div>
    </template>
  </SplitPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SplitPage from '@/components/layouts/SplitPage.vue'
import RegisterForm from '@/components/account/RegisterForm.vue'
import SelectLanguage from '@/components/language/SelectLanguage.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    RegisterForm,
    SelectLanguage,
    SplitPage
  },

  setup() {
    const { t } = useI18n()

    return { t }
  },


  data() {
    return {
      stage: 0
    }
  },

  computed: {
    title() {
      if (this.stage === 0) {
        return this.t('register.stage1.title')
      } else if (this.stage === 1) {
        return this.t('register.stage2.title')
      }

      return ''
    },

    subtitle() {
      if (this.stage === 0) {
        return this.t('register.stage1.description')
      } else if (this.stage === 1) {
        return this.t('register.stage2.description')
      }

      return ''
    }
  },

  methods: {
    setStage(stage: number) {
      this.stage = stage
    }
  }
})
</script>
