import SelectOption from './SelectOption'
import FieldDependancy from './FieldDepandancy'

class Field {
  stage: number
  identifier: string
  label: string
  type: string
  required: boolean
  width: string
  validation: any
  options: SelectOption[]
  dependsOn: FieldDependancy

  constructor(
    stage: number,
    identifier: string,
    label: string,
    type: string,
    required: boolean,
    width: string,
    validation: any,
    options: SelectOption[] = [],
    dependsOn: any = null
  ) {
    this.stage = stage
    this.identifier = identifier
    this.label = label
    this.type = type
    this.required = required
    this.width = width
    this.validation = validation
    this.options = options
    this.dependsOn = dependsOn
  }
}

export default Field
