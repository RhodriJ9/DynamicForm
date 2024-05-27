import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputLabel from '@/components/inputs/InputLabel.vue'

describe('InputLabel', () => {
  it('displays the label prop as text content', () => {
    const label = 'Test Label'
    const wrapper = mount(InputLabel, {
      props: {
        label
      }
    })

    const span = wrapper.find('span')
    expect(span.html()).toContain(label)
  })
})
