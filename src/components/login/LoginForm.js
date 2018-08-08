import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {BwmInput} from "../shared/form/BwmInput";
import {BwmResError} from "../shared/form/BwnResError";


const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props

  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label='Email'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='form-control'
        component={BwmInput}
      />
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Login
      </button>
      <BwmResError errors={errors} />

    </form>
  )
}

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Please enter email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter valid email'
  }


  if (!values.password) {
    errors.password = 'Password  Required'
  }
  return errors
}

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)