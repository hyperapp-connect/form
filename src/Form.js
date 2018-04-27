import { h } from 'hyperapp'

import { ErrorMsg } from './ErrorMsg'

import { Input } from './Input'

import { validate } from './lib'

export const submit = (action, state) => evt => {
  evt.preventDefault()

  const { hasErrored, errors } = validate({ evt, state })

  if (hasErrored) {
    return errors
  }

  const data = {}
  Object.keys(state.inputs).map(key => {
    data[key] = state.inputs[key].value
  })

  action(data)
}

export const Form = ({ action, actions, state, title, submitValue }) => (
  <form
    novalidate
    action={state.action}
    method={state.method || 'POST'}
    onsubmit={submit(action, state)}
    onchange={evt => actions.validate({ evt, state })}
  >
    {title && (
      <legend>
        <h2>{title}</h2>
      </legend>
    )}
    <ErrorMsg error={state.errors && state.errors.submit} />
    <fieldset>
      {Object.keys(state.inputs).map(k => (
        <div>
          <Input name={k} {...state.inputs[k]} />
          <ErrorMsg error={state.hasErrored && state.errors.inputs[k]} />
        </div>
      ))}
    </fieldset>

    <input type="submit" value={submitValue || 'Submit'} />
  </form>
)

export default Form
