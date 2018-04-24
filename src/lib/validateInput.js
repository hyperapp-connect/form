import capitalize from './capitalize'

export const validateInput = ({ input, inputs }) => {
  if (!input || input.type === 'submit' || !input.name) {
    return
  }

  const { name, value, type, required, max, min, equal } = input
  let error = undefined

  if (required && !value) {
    error = 'Please enter a value'
  } else if (min && value.length < parseInt(min, 10)) {
    error = `${capitalize(name)} is too short`
  } else if (max && value.length > parseInt(max, 10)) {
    error = `${capitalize(name)} is too long`
  }

  if (type === 'email' && value.indexOf('@') === -1) {
    error = 'Email must be valid'
  }

  if (equal) {
    const ele = inputs[equal].value
    if (!value || !ele || value !== ele) {
      error = `${capitalize(equal)}s must be equal`
    }
  }

  return error
}

export default validateInput
