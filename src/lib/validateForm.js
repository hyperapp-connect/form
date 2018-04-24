import validateInput from './validateInput'

export const validateForm = ({ evt, state }) => {
  const errors = {}
  let hasErrored = false

  const inputs = evt.currentTarget.getElementsByTagName('input')

  Object.keys(state.inputs)
    .filter(k => state.inputs[k].type !== 'submit')
    .map(key => {
      const input = state.inputs[key]
      input.name = key
      input.value = inputs[key].value
      const err = validateInput({ input, inputs })

      if (err) {
        errors.inputs = errors.inputs || {}
        errors.inputs[key] = err
        hasErrored = true
      }
    })

  return { errors, hasErrored }
}

export default validateForm
