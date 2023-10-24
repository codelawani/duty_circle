import { Controller, Control } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

type Props = {
  name: string;
  control: Control<any>;
  label: string;
  error: string | undefined;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
};

export default function MultipleSelect(props: Props) {
  const {
    control,
    name,
    options = [],
    label,
    error = null,
    placeholder = '',
  } = props;
  return (
    <div className=''>
      <div className='flex gap-2 bg-form-light dark:bg-form-dark rounded-lg px-5 items-center justify-between mb-0 pb-0 border'>
        <label htmlFor='tag' className='capitalize'>
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <CreatableSelect
                {...field}
                options={options}
                isMulti
                classNames={{
                  valueContainer: () =>
                    'dark:bg-form-dark bg-form-light border-none outline-none',
                  container: () =>
                    'dark:bg-form-dark bg-form-light w-full  boder-none outline-none',
                  input: () => 'dark:text-white text-black focus:border-none',
                  indicatorsContainer: () => 'dark:bg-form-dark bg-form-light',
                  menuList: () => 'dark:bg-form-dark bg-form-light capitalize',
                }}
                placeholder={placeholder}
              />
            );
          }}
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
  );
}
