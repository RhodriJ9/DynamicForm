<template>
  <div class="flex">
    <div class="p-2" @click="changeLocale('en')">English</div>
    <div class="p-2" @click="changeLocale('pt')">Português</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t, locale } = useI18n()

    const changeLocale = (lang) => {
      locale.value =  lang;
    }

    return { t, changeLocale }
  },
})
</script>