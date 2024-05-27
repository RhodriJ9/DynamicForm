import { describe, it, beforeEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import RegisterPage from '../pages/RegisterPage.vue'
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    register: {
      stage1: {
        title: 'Create an account',
        description: 'Please enter your account details'
      }
    }
  },
  pt: {
    register: {
      stage1: {
        title: 'Criar uma conta',
        description: 'Por favor, insira os detalhes da sua conta'
      }
    }
  }
}

describe('RegisterPage', () => {
  let wrapper
  let i18n

  beforeEach(() => {
    i18n = createI18n({
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      messages
    })

    wrapper = mount(RegisterPage, {
      global: {
        plugins: [i18n]
      }
    })
  })

  it('renders message in default locale', () => {
    expect(wrapper.text()).toContain('Create an account')
  })

  it('click changes to selected locale', async () => {
    expect(wrapper.text()).toContain('Create an account')

    const button = wrapper.find('#ptButton')
    expect(button.exists()).toBe(true)

    await button.trigger('click')
    await nextTick()

    expect(wrapper.text()).toContain('Criar uma conta')
  })
})
