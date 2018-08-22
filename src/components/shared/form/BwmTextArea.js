import React from 'react'


export const BwmTextArea = ({
                           input,
                           label,
                           className,
                           type,
                           rows,
                           meta: {touched, error, warning}
                         }) => (
  <div className='form-group'>
    <label>{label}</label>
    <div className='input-group'>
      <textarea {...input}
                rows={rows}
                className={className}>
      </textarea>
    </div>
    {touched &&
    ((error && <div className='alert alert-danger'>{error}</div>))}
  </div>
);
