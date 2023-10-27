import { UseFormRegister } from 'react-hook-form';
import React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    type?: string;
    error: string | undefined;
    required?: boolean;
    placeholder?: string;
  } & ReturnType<UseFormRegister<any>>
>(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      type = 'text',
      error = null,
      required = false,
      placeholder = '',
    },
    ref
  ) => (
    <div className=''>
      <div className='flex gap-2 bg-form-light dark:bg-form-dark rounded-lg px-5 items-center justify-between mb-0 pb-0 border'>
        <label htmlFor={name} className='py-1 capitalize flex min-w-fit'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          className='w-full rounded-lg px-3 py-2 bg-inherit outline-none'
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p
          role='alert'
          className='text-xs italic pt-1 dark:text-red-300 text-red-600'
        >
          {error}
        </p>
      )}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
