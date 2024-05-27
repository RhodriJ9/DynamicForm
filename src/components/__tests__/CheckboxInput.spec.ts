import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckboxInput from '@/components/inputs/CheckboxInput.vue'

describe('CheckboxInput', () => {
  it('renders a checkbox input element', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        id: 'test-checkbox',
        label: 'Test Checkbox',
        value: false
      }
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
  })

  it('emits update event on change', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        id: 'test-checkbox',
        label: 'Test Checkbox',
        value: false,
        modelValue: false
      }
    })
    const input = wrapper.find('input[type="checkbox"]')
    await input.setChecked(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  it('can be set to true', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        id: 'test-checkbox',
        label: 'Test Checkbox',
        value: false,
        modelValue: false
      }
    })
    const input = wrapper.find('input[type="checkbox"]')
    await input.setChecked(true)
    expect(input.element.checked).toBe(true)
  })

  it('can be set to true and then false again', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        id: 'test-checkbox',
        label: 'Test Checkbox',
        value: false,
        modelValue: false
      }
    })
    const input = wrapper.find('input[type="checkbox"]')
    await input.setChecked(true)
    expect(input.element.checked).toBe(true)
    await input.setChecked(false)
    expect(input.element.checked).toBe(false)
  })
})
