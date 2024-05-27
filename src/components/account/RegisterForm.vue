<template>
  <div class="w-full">
    <DynamicFields :fields="fields" @completed="submit" @stage="setStage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Field from '@/classes/Field.js'
import FieldDependancy from '@/classes/FieldDepandancy'
import SelectOption from '@/classes/SelectOption.js'
import DynamicFields from '../DynamicFields.vue'
import { useI18n } from 'vue-i18n'
import * as Yup from 'yup'

export default defineComponent({
  components: {
    DynamicFields
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
    validation() {
      return {
        name: Yup.string()
          .required(this.t('validation.required', { field: this.t('fields.name') }))
          .min(2, this.t('validation.min', { field: this.t('fields.name'), min: 2 })),
        email: Yup.string()
          .email(this.t('validation.email'))
          .required(this.t('validation.required', { field: this.t('fields.email') })),
        password: Yup.string()
          .min(8, this.t('validation.password.min', { min: 8 }))
          .matches(/\d/, this.t('validation.password.matches'))
          .required(this.t('validation.required', { field: this.t('fields.password') })),
        choiceOfService: Yup.string().required(
          this.t('validation.required', { field: this.t('fields.choiceOfService') })
        ),
        specifyOtherService: Yup.string().required(
          this.t('validation.required', { field: this.t('fields.specifyOtherService') })
        ),
        dateOfBirth: Yup.date()
          .transform((value, originalValue) => (originalValue === '' ? null : value))
          .nullable()
          .max(new Date(), this.t('validation.maxDate', { field: this.t('fields.dateOfBirth') })),
        termsAndConditions: Yup.boolean()
          .oneOf(
            [true],
            this.t('validation.tcsRequired', { field: this.t('fields.termsAndConditions') })
          )
          .required(
            this.t('validation.tcsRequired', { field: this.t('fields.termsAndConditions') })
          )
      }
    },

    fields() {
      // This can be received via API
      return [
        new Field(0, 'name', this.t('fields.name'), 'text', true, 'w-full', this.validation.name),
        new Field(
          0,
          'email',
          this.t('fields.email'),
          'text',
          true,
          'w-full',
          this.validation.email
        ),
        new Field(
          0,
          'password',
          this.t('fields.password'),
          'password',
          true,
          'w-full',
          this.validation.password
        ),

        new Field(
          1,
          'choiceOfService',
          this.t('fields.choiceOfService'),
          'select',
          true,
          'w-full',
          this.validation.choiceOfService,
          [
            new SelectOption(0, this.t('fields.webDevelopment')),
            new SelectOption(1, this.t('fields.mobileDevelopment')),
            new SelectOption(2, this.t('fields.seoServices')),
            new SelectOption(3, this.t('fields.other'))
          ]
        ),
        new Field(
          1,
          'specifyOtherService',
          this.t('fields.specifyOtherService'),
          'text',
          true,
          'w-full',
          this.validation.specifyOtherService,
          [],
          new FieldDependancy('choiceOfService', '3')
        ),
        new Field(
          1,
          'dateOfBirth',
          this.t('fields.dateOfBirth'),
          'date',
          true,
          'w-full',
          this.validation.dateOfBirth
        ),
        new Field(
          1,
          'termsAndConditions',
          this.t('fields.termsAndConditions'),
          'checkbox',
          true,
          'w-full',
          this.validation.termsAndConditions
        )
      ]
    }
  },

  methods: {
    submit(formData: any) {
      console.log(formData)
      alert(this.t('thankYou'))
    },

    setStage(stage: number) {
      this.stage = stage
      this.$emit('stage', stage)
    }
  }
})
</script>
