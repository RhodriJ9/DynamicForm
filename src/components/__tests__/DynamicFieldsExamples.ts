import Field from '@/classes/Field.js'
import FieldDependancy from '@/classes/FieldDepandancy'
import SelectOption from '@/classes/SelectOption.js'
import * as yup from 'yup'
import FieldClass from '@/classes/Field.js'

const fieldsSimple = [
  new FieldClass(
    0,
    'name',
    'Name',
    'text',
    true,
    'w-full',
    yup.string().required('Name is required').min(2, 'Name must be at least 2 characters')
  ),
  new FieldClass(
    0,
    'choiceOfService',
    'Choice of Service',
    'select',
    true,
    'w-full',
    yup.string().required('Choice of service is required'),
    [
      new SelectOption(0, 'Web Development'),
      new SelectOption(1, 'Mobile Development'),
      new SelectOption(2, 'SEO Services'),
      new SelectOption(3, 'Other')
    ]
  ),
  new FieldClass(
    0,
    'termsAndConditions',
    'Terms and Conditions',
    'checkbox',
    true,
    'w-full',
    yup
      .boolean()
      .oneOf([true], 'Terms and conditions must be accepted')
      .required('Terms and conditions must be accepted')
  )
]

const fieldsStages = [
  new FieldClass(
    0,
    'name',
    'Name',
    'text',
    true,
    'w-full',
    yup.string().required('Name is required').min(2, 'Name must be at least 2 characters')
  ),
  new FieldClass(
    1,
    'name2',
    'Name2',
    'text',
    true,
    'w-full',
    yup.string().required('Name is required').min(2, 'Name must be at least 2 characters')
  )
]

const fieldsHidden = [
  new Field(
    0,
    'choiceOfService',
    'choiceOfService',
    'select',
    true,
    'w-full',
    yup.string().required(),
    [
      new SelectOption(0, ''),
      new SelectOption(1, ''),
      new SelectOption(2, ''),
      new SelectOption(3, '')
    ]
  ),
  new Field(
    0,
    'specifyOtherService',
    'specifyOtherService',
    'text',
    true,
    'w-full',
    yup.string().required(),
    [],
    new FieldDependancy('choiceOfService', '3')
  )
]

export { fieldsSimple, fieldsStages, fieldsHidden }
