<template>
  <VeeForm :validation-schema="validationSchema" class="w-full" @submit="onSubmit">
    <div class="flex flex-wrap w-full -mr-4">
      <div
        v-for="field in currentFields"
        :key="field.identifier"
        :class="field.width"
        class="mb-8 px-4"
      >
        <InputLabel
          v-if="displayLabel(field)"
          :id="field.identifier"
          :label="field.label"
          :required="field.required"
          class="mb-2 ml-1"
        />
        <Field
          :name="field.identifier"
          :type="field.type"
          v-slot="{ field: slotField, errors }"
          :id="field.identifier"
        >
          <div v-if="field.type === 'text' || field.type === 'password' || field.type === 'date'">
            <StringInput
              v-bind="slotField"
              v-model="formData[field.identifier]"
              :id="field.identifier"
              :type="field.type"
              :label="field.label"
              :value="formData[field.identifier]"
            />
          </div>
          <div v-if="field.type === 'select'">
            <SelectInput
              v-bind="slotField"
              v-model="formData[field.identifier]"
              :id="field.identifier"
              :label="field.label"
              :options="field.options"
            />
          </div>
          <div v-if="field.type === 'checkbox'">
            <CheckboxInput
              v-bind="slotField"
              v-model="formData[field.identifier]"
              :value="formData[field.identifier]"
              :id="field.identifier"
              :label="field.label"
            />
          </div>
          <div
            v-if="showErrors && errors.length > 0 && !errors[0].includes('boolean')"
            class="ml-1 mt-2 -mb-4 text-red-700 leading-none font-heading text-sm flex items-center"
          >
            <svg
              class="w-3 h-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
              />
            </svg>
            <ErrorMessage :name="field.identifier" class="ml-2" />
          </div>
        </Field>
      </div>
    </div>

    <div class="flex justify-end space-x-2 mx-4">
      <SecondaryButton v-if="stage > 0" type="button" text="Back" @click="back" />
      <PrimaryButton :text="finalStage ? t('submit') : t('next')" type="submit" @click="onSubmit" />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { defineComponent, reactive, type PropType } from 'vue'
import PrimaryButton from './buttons/PrimaryButton.vue'
import SecondaryButton from './buttons/SecondaryButton.vue'
import InputLabel from './inputs/InputLabel.vue'
import StringInput from './inputs/StringInput.vue'
import SelectInput from './inputs/SelectInput.vue'
import CheckboxInput from './inputs/CheckboxInput.vue'
import FieldClass from '@/classes/Field.js'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as Yup from 'yup'

export default defineComponent({
  props: {
    fields: {
      type: Array as PropType<FieldClass[]>,
      required: true
    }
  },

  components: {
    PrimaryButton,
    SecondaryButton,
    InputLabel,
    StringInput,
    VeeForm,
    Field,
    ErrorMessage,
    SelectInput,
    CheckboxInput
  },

  data() {
    return {
      stage: 0,
      formData: reactive(this.createFormData()),
      showErrors: false
    }
  },

  setup() {
    const { t } = useI18n()

    return { t }
  },

  computed: {
    currentFields() {
      return this.fields.filter((f) => f.stage === this.stage && this.shouldRenderField(f))
    },

    totalStages() {
      return new Set(this.fields?.map((obj) => obj['stage'])).size - 1
    },

    finalStage() {
      return this.totalStages === this.stage
    },

    validationSchema() {
      const data = {}
      this.currentFields.forEach((field) => {
        data[field.identifier] = field.validation
      })

      return Yup.object().shape(data)
    }
  },

  methods: {
    createFormData() {
      const data = {}
      this.fields?.forEach((field) => {
        if (field.type === 'checkbox') {
          data[field.identifier] = false
        } else {
          data[field.identifier] = ''
        }
      })
      return data
    },

    async onSubmit(e: any) {
      try {
        await this.validationSchema.validate(this.formData, { abortEarly: false })
        e.preventDefault()
        if (!this.finalStage) {
          this.next()
        } else {
          this.$emit('completed', this.formData)
        }
        this.showErrors = false
      } catch (err) {
        this.showErrors = true
      }
    },

    displayLabel(field: FieldClass) {
      return field.type !== 'checkbox'
    },

    shouldRenderField(field: FieldClass) {
      if (field.dependsOn === null) {
        return true
      }
      const dependFieldValue = this.formData[field.dependsOn.identifier]
      return (
        dependFieldValue !== undefined &&
        field.dependsOn.value.toString() === dependFieldValue.toString()
      )
    },

    next() {
      if (!this.finalStage) {
        this.stage++
        this.$emit('stage', this.stage)
      }
    },

    back() {
      if (this.stage > 0) {
        this.stage--
        this.$emit('stage', this.stage)
      }
    }
  }
})
</script>
