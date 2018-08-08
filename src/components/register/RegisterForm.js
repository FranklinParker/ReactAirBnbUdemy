import React from 'react'
import {Field, reduxForm} from 'redux-form'

const renderField = ({
                       input,
                       label,
                       className,
                       type,
                       meta: {touched, error, warning}
                     }) => (
  <div className='form-group'>
    <label>{label}</label>
    <div className='input-group'>
      <input {...input} type={type} className={className}/>
    </div>
    {touched &&
    ((error && <div className='alert alert-danger'>{error}</div>))}
  </div>
)

const RegisterForm = props => {
  const {handleSubmit, pristine, reset, submitting, submitCb} = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>

      <Field
        name="username"
        type="text"
        className='form-control'
        component={renderField}
        label='Username'
      />

      <Field
        name="email"
        type="email"
        className='form-control'
        component={renderField}
        label='Email'
      />

      <Field
        name="password"
        type="password"
        className='form-control'
        component={renderField}
        label='Password'
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label='Confirm Password'
        className='form-control'
        component={renderField}
      />
      <div>
        <button type="submit"
                className='btn btn-bwm'
                disabled={pristine || submitting}>
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