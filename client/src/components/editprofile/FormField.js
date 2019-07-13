import React from 'react';
import { bool, func, string } from 'prop-types';
import { Form } from 'semantic-ui-react';

import { field, label, input } from './formfield.module.scss';

function FormField({ type = 'text', disabled = false, name, value, onChange }) {
  return (
    <Form.Field className={field}>
      <label className={label}>{name}</label>
      <input
        className={input}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </Form.Field>
  );
}

FormField.propTypes = {
  type: string,
  name: string.isRequired,
  value: string.isRequired,
  disabled: bool,
  onChange: func.isRequired,
};

export default FormField;
