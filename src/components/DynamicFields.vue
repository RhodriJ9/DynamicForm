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
          <div v-if="field.type === 'text' || field.type === 'password'">
            <StringInput
              v-bind="slotField"
              v-model="formData['field' + field.stage + index]"
              :id="'field' + field.stage + index"
              :type="field.type"
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
        :text="finalStage ? 'Submit' : 'Next'"
        type="submit"
        @click="onSubmit"
    />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PrimaryButton from './Buttons/PrimaryButton.vue'
import InputLabel from './Inputs/InputLabel.vue'
import StringInput from './Inputs/Input.vue'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
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
  },

  data() {
    return {
      stage: 0,
      formData: reactive(this.createFormData()),
      showErrors: false,
    }
  },

  computed: {
    currentFields() {
      return this.fields?.filter(f => f.stage === this.stage);
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

    async onSubmit(e:any) {
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
    }
  }
})
</script>
