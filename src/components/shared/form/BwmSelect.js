import React from 'react'


export const BwmSelect = ({
                            input,
                            label,
                            className,
                            options,
                            meta: {touched, error, warning}
                          }) => (
  <div className='form-group'>
    <label>{label}</label>
    <div className='input-group'>
      <select {...input} className={className}>
        <option>Option 1</option>
        <option>Option 1</option>

      </select>
    </div>
    {touched &&
    ((error && <div className='alert alert-danger'>{error}</div>))}
  </div>
);
