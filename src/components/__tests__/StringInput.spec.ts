import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '@/components/inputs/StringInput.vue'

describe('Input', () => {
  it('renders an input element', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders an input with the text type', () => {
    const wrapper = mount(Input, {
      props: { type: 'text' }
    })
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('renders an input with the password type', () => {
    const wrapper = mount(Input, {
      props: { type: 'password' }
    })
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('renders an input with the date type', () => {
    const wrapper = mount(Input, {
      props: { type: 'date' }
    })
    expect(wrapper.find('input').attributes('type')).toBe('date')
  })

  it('emits update event on input', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    await input.setValue('Text Input')
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual(['Text Input'])
  })
})
