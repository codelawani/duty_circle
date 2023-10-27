import { Controller, Control } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  name: string;
  control: Control<any>;
  label: string;
  error: string | undefined;
  required?: boolean;
  placeholder?: string;
};

export default function ControlledDatePicker(props: Props) {
  const {
    control,
    name,
    required = false,
    label,
    error = null,
    placeholder = '',
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <div className='flex gap-2 bg-form-light dark:bg-form-dark rounded-lg px-5 items-center justify-between mb-0 pb-0 border'>
            <label htmlFor={name} className='py-1 capitalize flex min-w-fit'>
              {label} {required && <span className='text-red-500'>*</span>}
            </label>
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              showTimeSelect
              closeOnScroll
              minDate={new Date()}
              className='w-full rounded-lg px-3 py-2 bg-inherit outline-none'
              wrapperClassName='w-full'
              placeholderText={placeholder}
              dateFormat='MMMM d, yyyy h:mm aa'
            />
          </div>
          {error && (
            <p role='alert' className='text-xs italic'>
              {error}
            </p>
          )}
        </div>
      )}
    />
  );
}
