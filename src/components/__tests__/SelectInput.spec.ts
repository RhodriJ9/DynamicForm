import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectInput from '@/components/inputs/SelectInput.vue'

describe('SelectInput', () => {
  const options = [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' }
  ]

  it('renders a select element', () => {
    const wrapper = mount(SelectInput, {
      props: {
        options: []
      }
    })
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('renders the correct number of options', () => {
    const wrapper = mount(SelectInput, {
      props: {
        options
      }
    })
    const renderedOptions = wrapper.findAll('option')
    expect(renderedOptions.length).toBe(options.length)
  })

  it('renders the correct option values and texts', () => {
    const wrapper = mount(SelectInput, {
      props: {
        options
      }
    })
    const renderedOptions = wrapper.findAll('option')
    renderedOptions.forEach((option, index) => {
      expect(option.element.value).toBe(options[index].value)
      expect(option.text()).toBe(options[index].text)
    })
  })

  it('emits update event on change', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        options
      }
    })
    const selectElement = wrapper.find('select')
    await selectElement.setValue('option2')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['option2'])
  })
})
