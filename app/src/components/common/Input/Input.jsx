import React from 'react';
import styles from './Input.module.css';

export default function Input({
  label,
  name,
  type,
  value,
  handleChange,
  required = false,
}) {
  let inputProps = { label, name, type, value };

  if (required) {
    inputProps.required = true;
  }

  return (
    <div className={styles.field}>
      <input className={styles.input} {...inputProps} onChange={handleChange} />
      <label htmlFor={name}>{label} {required && <span className={styles.requiredIcon}>*</span>}</label>
    </div>
  );
}
