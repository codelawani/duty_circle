import { UseFormRegister } from 'react-hook-form';
import React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    type?: string;
    error: string | undefined;
    required?: boolean;
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
    },
    ref
  ) => (
    <>
      <label htmlFor={name} className='block py-1 capitalize'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className='w-full rounded-lg px-3 py-2'
      />
      {error && (
        <p role='alert' className='text-xs italic'>
          {error}
        </p>
      )}
    </>
  )
);

Input.displayName = 'Input';

export default Input;
