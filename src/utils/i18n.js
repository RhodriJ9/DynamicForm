import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    fields: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
      choiceOfService: 'Choice of Service',
      specifyOtherService: 'Please specify other service',
      dateOfBirth: 'Date of Birth',
      termsAndConditions:
        'I agree to the <a href="https://upmind.com/terms" target="_blank" class="text-blue-500">Terms & Conditions</a>',
      webDevelopment: 'Web Development',
      mobileDevelopment: 'Mobile Development',
      seoServices: 'SEO Services',
      other: 'Other'
    },
    validation: {
      required: '{field} is required',
      tcsRequired: 'Terms & Conditions must be accepted',
      min: '{field} must be at least {min} characters',
      email: 'Valid email is required',
      password: {
        min: 'Password must be at least {min} characters',
        matches: 'Password must contain at least one number'
      },
      maxDate: '{field} must be a past date'
    },
    submit: 'Submit',
    next: 'Next',
    thankYou: 'Thank you for your submission.'
  },
  pt: {
    fields: {
      name: 'Nome',
      email: 'Email',
      password: 'Senha',
      choiceOfService: 'Escolha do Serviço',
      specifyOtherService: 'Por favor, especifique outro serviço',
      dateOfBirth: 'Data de Nascimento',
      termsAndConditions: 'Eu concordo com os Termos e Condições',
      webDevelopment: 'Desenvolvimento Web',
      mobileDevelopment: 'Desenvolvimento Mobile',
      seoServices: 'Serviços de SEO',
      other: 'Outro'
    },
    validation: {
      required: '{field} é obrigatório',
      tcsRequired: 'Termos e Condições devem ser aceitos',
      min: '{field} deve ter pelo menos {min} caracteres',
      email: 'Um email válido é obrigatório',
      password: {
        min: 'A senha deve ter pelo menos {min} caracteres',
        matches: 'A senha deve conter pelo menos um número'
      },
      maxDate: '{field} deve ser uma data passada'
    },
    submit: 'Enviar',
    next: 'Próximo',
    thankYou: 'Muito obrigado!'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
