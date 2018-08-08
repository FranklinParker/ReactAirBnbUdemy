import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { bwmInput} from "../shared/form/BwmInput";


const RegisterForm = props => {
  const {handleSubmit, pristine, reset, submitting, submitCb, valid} = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>

      <Field
        name="username"
        type="text"
        className='form-control'
        component={bwmInput}
        label='Username'
      />

      <Field
        name="email"
        type="email"
        className='form-control'
        component={bwmInput}
        label='Email'
      />

      <Field
        name="password"
        type="password"
        className='form-control'
        component={bwmInput}
        label='Password'
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label='Confirm Password'
        className='form-control'
        component={bwmInput}
      />
      <div>
        <button type="submit"
                className='btn btn-bwm'
                disabled={!valid || pristine || submitting}>
          Submit
        </button>

      </div>
    </form>
  )
}
const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'User name is required'
  }
  if (values.username && values.username.length < 4) {
    errors.username = 'User name must be at 4 Characters'
  }
  if (!values.email) {
    errors.email = 'Please enter email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter valid email'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Password Confirmation required'
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords must match'
  }
  return errors
}
export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)