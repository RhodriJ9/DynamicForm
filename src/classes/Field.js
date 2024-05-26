class Field {
  constructor(stage, label, type, required, width, validation, options = [], dependsOn = null) {
    this.stage = stage
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
