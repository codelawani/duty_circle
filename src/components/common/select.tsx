import { UseFormRegister } from 'react-hook-form';
import React from 'react';

const Select = React.forwardRef<
  HTMLSelectElement,
  {
    label: string;
    children: React.ReactNode;
    error: string | undefined;
    required?: boolean;
  } & ReturnType<UseFormRegister<any>>
>(
  (
    { onChange, onBlur, name, label, children, error = null, required = false },
    ref
  ) => (
    <>
      <label htmlFor={name} className='block font-medium capitalize pb-2'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <select
        name={name}
        id={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className='w-full p-2 rounded-lg'
      >
        {children}
      </select>
      {error && (
        <p role='alert' className='italic text-xs py-1'>
          {error}
        </p>
      )}
    </>
  )
);

Select.displayName = 'Select';

export default Select;
