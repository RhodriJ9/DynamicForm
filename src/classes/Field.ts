import SelectOption from './SelectOption.ts'
import FieldDependancy from './FieldDepandancy.ts'

class Field {
  stage: number
  identifier: string
  label: string
  type: string
  required: boolean
  width: string
  validation: any
  options: SelectOption[]
  dependsOn: FieldDependancy[]

  constructor(
    stage: number,
    identifier: string,
    label: string,
    type: string,
    required: boolean,
    width: string,
    validation: any,
    options: SelectOption[] = [],
    dependsOn: FieldDependancy[] = []
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
