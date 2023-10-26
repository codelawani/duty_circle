'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/src/components/common/input';
import { Button } from '@/src/components/ui/button';
import toast from 'react-hot-toast';
import { useState } from 'react';
import SimpleLoaader from '@/src/components/loaders/SimpleLoaader';
import { useRouter } from 'next/navigation';
import { useTask } from '@/src/components/context/TasksContext';
import ControlledDatePicker from './date-picker';
import MultipleSelect from './multiple-select';

const schema = yup
  .object({
    title: yup.string().required('please provide title'),
    description: yup.string().optional(),
    dueDate: yup.string().required('please provide due date'),
    completed: yup.boolean().required(),
    consequence: yup.string().optional(),
    public: yup.boolean().required(),
    tag: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .max(10, 'tags must be less than or equal to 10'),
  })
  .required();

export default function NewTaskForm() {
  const { newTask } = useTask();
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
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
      className={`flex flex-col gap-7 w-full md:w-1/2 mx-auto relative px-1 md:px-6 md:border py-5 rounded-md lg:w-2/4 bg-[#4d4d4d] bg-opacity-30 dark:bg-inherit dark:bg-opacity-100 ${
        isSending ? 'opacity-50' : ''
      }`}
    >
      <Input
        label='title'
        {...register('title')}
        error={errors?.title?.message}
        required
        placeholder='title of task'
      />
      <Input
        label='description'
        {...register('description')}
        error={errors?.description?.message}
        placeholder='what is the task about'
      />
      <ControlledDatePicker
        control={control}
        name='dueDate'
        error={errors?.dueDate?.message}
        label={'due date'}
        required
        placeholder='choose due date of task'
      />
      <Input
        label='consequence'
        {...register('consequence')}
        error={errors?.consequence?.message}
        placeholder='what is the consequence of failure'
      />

      <MultipleSelect
        name='tag'
        label='tags'
        placeholder='Add related tags'
        options={[
          {
            value: 'project',
            label: 'project',
          },
          {
            value: 'coding',
            label: 'coding',
          },
        ]}
        control={control}
        error={errors?.tag?.message}
      />

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
        className='capitalize text-lg  bg-gradient mt-3 md:w-1/3 md:self-center'
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
