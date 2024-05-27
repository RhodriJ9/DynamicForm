import { describe, it, beforeEach, expect, } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import DynamicFields from '@/components/DynamicFields.vue'
import i18n from '@/utils/i18n'
import { fieldsSimple, fieldsStages, fieldsHidden, singleStage } from './DynamicFieldsExamples'

describe('DynamicFields', () => {
  describe('Fields', () => {
    let wrapper

    beforeEach(() => {
      // Create a local Vue instanc
      const app = createApp({})
      app.use(i18n)

      wrapper = mount(DynamicFields, {
        props: { fields: fieldsSimple },
        global: {
          plugins: [i18n]
        }
      })
    })

    it('initializes the form and renders fields', () => {
      fieldsSimple.forEach((f) => {
        expect(f.identifier).toBeDefined()
      })
    })

    it('renders text field', () => {
      const inputFields = fieldsSimple.filter((field) => field.type === 'text')
      inputFields.forEach((field) => {
        const input = wrapper.find(`input[type="text"]#${field.identifier}`)
        expect(input.exists()).toBe(true)
      })
    })

    it('renders date field', () => {
      const inputFields = fieldsSimple.filter((field) => field.type === 'date')
      inputFields.forEach((field) => {
        const input = wrapper.find(`input[type="text"]#${field.identifier}`)
        expect(input.exists()).toBe(true)
      })
    })

    it('renders date field', () => {
      const inputFields = fieldsSimple.filter((field) => field.type === 'checkbox')
      inputFields.forEach((field) => {
        const input = wrapper.find(`input[type="checkbox"]#${field.identifier}`)
        expect(input.exists()).toBe(true)
      })
    })

    it('renders select/dropdown field', () => {
      const inputFields = fieldsSimple.filter((field) => field.type === 'select')
      inputFields.forEach((field) => {
        const input = wrapper.find(`select#${field.identifier}`)
        expect(input.exists()).toBe(true)
      })
    })
  })

  describe('State', () => {
    let wrapper

    beforeEach(() => {
      const app = createApp({})
      app.use(i18n)

      wrapper = mount(DynamicFields, {
        props: { fields: fieldsStages },
        global: {
          plugins: [i18n]
        }
      })
    })

    it('allows navigation to the next stage when validation is complete for current stage', async () => {
      const inputFields = fieldsSimple.filter((field) => field.type === 'text' && field.stage === 0)
      inputFields.forEach(async (field) => {
        const input = wrapper.find(`input[type="text"]#${field.identifier}`)
        expect(input.exists()).toBe(true)
        await input.setValue('Name')

        const primaryButton = wrapper.find('button')
        await primaryButton.trigger('click')

        const stageValue = wrapper.vm.stage // Replace 'someDataProperty' with the actual data property name
        expect(stageValue).toBe(1)
      })
    })

    it('prevent navigation to the next stage when validation is not complete', async () => {
      const primaryButton = wrapper.find('button#primaryButton')
      await primaryButton.trigger('click')

      const stageValue = wrapper.vm.stage
      expect(stageValue).toBe(0)
    })

    it('computes validation schema based on fields that are in the current stage', () => {
      const schema = wrapper.vm.validationSchema
      expect(schema.fields.name).toBeDefined()
    })

    it('retains data when navigating between stages', async () => {
      const field = fieldsSimple.filter((field) => field.type === 'text' && field.stage === 0)[0]
      const input = wrapper.find(`input[type="text"]#${field.identifier}`)
      expect(input.exists()).toBe(true)
      await input.setValue('Name')

      const primaryButton = wrapper.find('button#primaryButton')
      await primaryButton.trigger('click')

      const stageValue = wrapper.vm.stage
      expect(stageValue).toBe(1)

      const secondaryButton = wrapper.find('button#secondaryButton')
      await secondaryButton.trigger('click')

      const stageValue2 = wrapper.vm.stage
      expect(stageValue2).toBe(0)

      const input2 = wrapper.find(`input[type="text"]#${field.identifier}`)
      expect(input2.exists()).toBe(true)
      expect(input2.element.value).toBe('Name')
    })

    let hiddenFieldsWrapper

    beforeEach(() => {
      const app = createApp({})
      app.use(i18n)

      hiddenFieldsWrapper = mount(DynamicFields, {
        props: { fields: fieldsHidden },
        global: {
          plugins: [i18n]
        }
      })
    })

    it('render dependant field when required', async () => {
      const field = fieldsHidden.filter((field) => field.type === 'select')[0]
      const selectField = hiddenFieldsWrapper.find(`select#${field.identifier}`)

      expect(selectField.exists()).toBe(true)
      await selectField.setValue('3')

      const field2 = fieldsHidden.filter((field) => field.type === 'text')[0]
      const inputField = hiddenFieldsWrapper.find(`input#${field2.identifier}`)
      expect(inputField.exists()).toBe(true)
    })

    it('does not render dependant field when not required', () => {
      const field2 = fieldsHidden.filter((field) => field.type === 'text')[0]
      const inputField = hiddenFieldsWrapper.find(`input#${field2.identifier}`)
      expect(inputField.exists()).toBe(false)
    })
  })

  describe('Events', () => {
    let wrapper

    beforeEach(() => {
      const app = createApp({})
      app.use(i18n)

      wrapper = mount(DynamicFields, {
        props: { fields: fieldsStages },
        global: {
          plugins: [i18n]
        }
      })
    })

    it('emits the stage when progressing', async () => {
      const field = fieldsStages.filter((field) => field.type === 'text' && field.stage === 0)[0]
      const input = wrapper.find(`input[type="text"]#${field.identifier}`)
      expect(input.exists()).toBe(true)
      await input.setValue('Name')

      const primaryButton = wrapper.find('button#primaryButton')
      await primaryButton.trigger('click')

      const events = wrapper.emitted()
      expect(events).toHaveProperty('stage')
      expect(events['stage'][0][0]).toEqual(1)
    })

    it('emits the stage when repgressing', async () => {
      const field = fieldsStages.filter((field) => field.type === 'text' && field.stage === 0)[0]
      const input = wrapper.find(`input[type="text"]#${field.identifier}`)
      expect(input.exists()).toBe(true)
      await input.setValue('Name')

      const primaryButton = wrapper.find('button#primaryButton')
      await primaryButton.trigger('click')

      const stageValue = wrapper.vm.stage
      expect(stageValue).toBe(1)

      const secondaryButton = wrapper.find('button#secondaryButton')
      await secondaryButton.trigger('click')

      const events = wrapper.emitted()
      expect(events).toHaveProperty('stage')
      expect(events['stage'][1][0]).toEqual(0)
    })

    it('emits when form has been completed', async () => {
      const field = fieldsStages.filter((field) => field.type === 'text' && field.stage === 0)[0]
      const input = wrapper.find(`input[type="text"]#${field.identifier}`)
      expect(input.exists()).toBe(true)
      await input.setValue('Name')

      const primaryButton = wrapper.find('button#primaryButton')
      await primaryButton.trigger('click')

      const field2 = fieldsStages.filter((field) => field.type === 'text' && field.stage === 1)[0]
      const input2 = wrapper.find(`input[type="text"]#${field2.identifier}`)
      expect(input2.exists()).toBe(true)
      await input2.setValue('Name')

      const primaryButton2 = wrapper.find('button#primaryButton')
      await primaryButton2.trigger('click')

      const events = wrapper.emitted()
      expect(events).toHaveProperty('completed')
    })
  })

  // describe('Validation', () => {
  //   let wrapper

  //   beforeEach(() => {
  //     const app = createApp({})
  //     app.use(i18n)

  //     wrapper = mount(DynamicFields, {
  //       props: { fields: singleStage },
  //       global: {
  //         plugins: [i18n]
  //       }
  //     })
  //   })

  // it('displays validation errors on submit', async () => {})

  // it('does not display validation errors before submit', () => {})
  // })
})
