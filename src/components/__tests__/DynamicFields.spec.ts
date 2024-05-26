import { describe, it } from 'vitest'

describe('DynamicFields', () => {
  describe('Fields', () => {
    it('initializes the form with the corrext fields', () => {})
    it('renders text field', () => {})
    it('renders date field', () => {})
    it('renders checkbox field', () => {})
    it('renders select/dropdown field', () => {})
  })

  describe('State', () => {
    it('allows navigation to the next stage when validation is complete for current stage', () => {})
    it('prevent navigation to the next stage when validation is not complete', () => {})
    it('computes validation schema based on fields that are in the current stage', () => {})
    it('retains data when navigating between stages', () => {})
    it('render dependant field when required', () => {})
    it('does not render dependant field when not required', () => {})
  })

  describe('Validation', () => {
    it('displays validation errors on submit', () => {})
    it('does not display validation errors before submit', () => {})
    it('does not break when no field validations are provided', () => {})
    it('does not require validation for dependant field when not required', () => {})
    it('correctly requires validation for dependant field when required', () => {})
  })
})
