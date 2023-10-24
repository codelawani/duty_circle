'use client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/src/components/common/input';
import { Button } from '@/src/components/ui/button';
import toast from 'react-hot-toast';
import { useState } from 'react';
import SimpleLoaader from '@/src/components/loaders/SimpleLoaader';
import { useRouter } from 'next/navigation';
import { useTask } from '@/src/components/context/TasksContext';
import CreatableSelect from 'react-select/creatable';

const schema = yup
  .object({
    title: yup.string().required('please provide title'),
    description: yup.string().optional(),
    dueDate: yup.string().required('please provide due date'),
    completed: yup.boolean().required(),
    consequence: yup.string().optional(),
    public: yup.boolean().required(),
    tag: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  })
  .required();

export default function NewTaskForm() {
  const { newTask } = useTask();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      completed: false,
      consequence: '',
      public: false,
      dueDate: '',
      tag: [],
    },
  });

  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const tags = data.tag ? data.tag.map(({ value }) => value) : [];
    const updatedData = { ...data, tags };
    delete updatedData.tag;
    setIsSending(true);
    try {
      const { status, message } = await newTask(updatedData);
      if (status === 'success') {
        toast.success(message, {
          position: 'top-center',
          duration: 5000,
        });
        reset();
        router.push('/tasks');
      } else {
        toast.error(message, {
          position: 'top-center',
          duration: 5000,
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? 'An error occurred';
      toast.error(message, {
        duration: 6000,
      });
    } finally {
      setIsSending(false);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-7 w-full md:w-1/2 mx-auto relative px-1 md:px-6 md:border py-5 rounded-md lg:w-2/4 ${
        isSending ? 'opacity-50' : ''
      }`}
    >
      <Input
        label='title'
        {...register('title')}
        error={errors?.title?.message}
        required
      />
      <Input
        label='description'
        {...register('description')}
        error={errors?.description?.message}
      />
      <Input
        label='due date'
        type='datetime-local'
        {...register('dueDate')}
        error={errors?.dueDate?.message}
        required
      />
      <Input
        label='consequence'
        {...register('consequence')}
        error={errors?.consequence?.message}
      />

      <div className='flex gap-3'>
        <label htmlFor='tag' className='capitalize'>
          tags
        </label>
        <Controller
          name='tag'
          control={control}
          render={({ field }) => {
            return (
              <CreatableSelect
                {...field}
                options={[
                  {
                    value: 'project',
                    label: 'project',
                  },
                  {
                    value: 'portfolio',
                    label: 'potfolio',
                  },
                  {
                    value: 'coding',
                    label: 'coding',
                  },
                ]}
                isMulti
                classNames={{
                  valueContainer: () =>
                    'dark:bg-form-dark bg-form-light border-none',
                  container: () => 'dark:bg-form-dark bg-form-light w-full ',
                  multiValue: () => 'bg-blue-500',
                  indicatorsContainer: () => 'dark:bg-form-dark bg-form-light',
                  menuList: (state) =>
                    'dark:bg-form-dark bg-form-light capitalize',
                }}
              />
            );
          }}
        />
      </div>

      <div className='flex gap-3'>
        <Input
          type='checkbox'
          label='public'
          {...register('public')}
          error={errors?.public?.message}
        />
      </div>

      <Button
        size={'sm'}
        type='submit'
        className='capitalize text-lg dark:btn-gradient bg-yellow-500 mt-3 md:w-1/3 md:self-center'
      >
        create
      </Button>
      {isSending && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <SimpleLoaader />
        </div>
      )}
    </form>
  );
}
