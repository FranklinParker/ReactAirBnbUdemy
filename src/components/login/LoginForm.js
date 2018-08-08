import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {BwmInput} from "../shared/form/BwmInput";
import {BwmResError} from "../shared/form/BwnResError";
import { minLength4, required} from "../shared/form/validate";


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
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='form-control'
        validate={[required]}
        component={BwmInput}
      />
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Login
      </button>
      <BwmResError errors={errors} />

    </form>
  )
}


export default reduxForm({
  form: 'loginForm'
})(LoginForm)