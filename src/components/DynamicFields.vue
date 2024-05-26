<template>
    <VeeForm :validation-schema="validationSchema" class="w-full" @submit="onSubmit">
    <div class="flex flex-wrap w-full -mx-4">
      <div
        v-for="(field, index) in currentFields"
        :key="'field' + field.stage + index"
        :class="field.width"
        class="px-4 mb-8"
      >
        <InputLabel
          v-if="displayLabel(field)"
          :id="'field' + field.stage + index"
          :label="field.label"
          :required="field.required"
          class="mb-2 ml-1"
        />
        <Field
          :name="'field' + field.stage + index.toString()"
          v-slot="{ field: slotField }"
          :id="'field' + field.stage + index"
        >
          <div v-if="field.type === 'text' || field.type === 'password' || field.type === 'date'">
            <StringInput
              v-bind="slotField"
              v-model="formData['field' + field.stage + index]"
              :id="'field' + field.stage + index"
              :type="field.type"
              :label="field.label"
            />
          </div>
          <div v-if="field.type === 'select'">
            <SelectInput
              v-bind="slotField"
              v-model="formData['field' + field.stage + index]"
              :id="'field' + field.stage + index"
              :label="field.label"
              :options="field.options"
            />
          </div>
          <div v-if="field.type === 'checkbox'">
            <CheckboxInput 
              v-bind="slotField"
              v-model="formData['field' + field.stage + index]"
              :id="'field' + field.stage + index"
              :label="field.label"
            />
          </div>
        </Field>
        <div class="ml-1 mt-1 -mb-4">
          <ErrorMessage 
            v-if="showErrors" 
            :name="'field' + field.stage + index.toString()" 
            class="text-red-700 leading-none font-heading text-sm" 
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end mx-8">
      <PrimaryButton 
        :text="finalStage ? this.t('submit') : this.t('next')"
        type="submit"
        @click="onSubmit"
    />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PrimaryButton from './buttons/PrimaryButton.vue'
import InputLabel from './inputs/InputLabel.vue'
import StringInput from './inputs/Input.vue'
import SelectInput from './inputs/SelectInput.vue'
import CheckboxInput from './inputs/CheckboxInput.vue'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as Yup from 'yup'

export default defineComponent({
  props: {
    fields: Array
  },

  components: {
    PrimaryButton,
    InputLabel,
    StringInput,
    VeeForm,
    Field,
    ErrorMessage,
    SelectInput,
    CheckboxInput,
  },

  data() {
    return {
      stage: 0,
      formData: reactive(this.createFormData()),
      showErrors: false,
    }
  },

  setup() {
    const { t } = useI18n()

    return { t }
  },

  computed: {
    currentFields() {
      return this.fields.filter(f => f.stage === this.stage && this.shouldRenderField(f));
    },

    totalStages() {
      return new Set(this.fields?.map(obj => obj['stage'])).size - 1;
    },

    finalStage() {
      return this.totalStages === this.stage;
    },

    validationSchema() {
      const data = {};
      this.currentFields.forEach((field, index) => {
        data['field' + field.stage + index] = field.validation;
      });
      
      return Yup.object().shape(data);
    }
  },

  methods: {
    createFormData() {
      const data = {};
      this.fields?.forEach((field, index) => {
        data['field' + field.stage + index] = '';
      })
      return data;
    },

    async onSubmit(e) {
      try {
        await this.validationSchema.validate(this.formData, { abortEarly: false });
        e.preventDefault();
        if(!this.finalStage) {
          this.stage++;
        } else {
          this.$emit('completed', this.formData);
        }
        this.showErrors = false;
      } catch (err) {
        this.showErrors = true;
      }
    },

    displayLabel(field) {
      return field.type !== 'checkbox';
    },

    shouldRenderField(field) {
      if (field.dependsOn === [] || field.dependsOn.length === 0) {
        return true;
      }
      const dependFieldValue = this.formData['field' + field.dependsOn.stage + field.dependsOn.index];
      return dependFieldValue !== undefined && field.dependsOn.value.toString() === dependFieldValue.toString()
    },
  }
})
</script>
