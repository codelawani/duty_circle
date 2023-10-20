'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/src/components/common/input';
import { Button } from '@/src/components/ui/button';
import Select from '@/src/components/common/select';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import SimpleLoaader from '@/src/components/loaders/SimpleLoaader';

const schema = yup
  .object({
    title: yup.string().required('please provide title'),
    description: yup.string().optional(),
    dueDate: yup.string().required('please provide due date'),
    status: yup.string().required(),
    consequence: yup.string().optional(),
    privacy: yup.string().required(''),
  })
  .required();

export default function NewTaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: 'PENDING',
      consequence: '',
      privacy: 'PRIVATE',
      dueDate: '',
    },
  });

  const [isSending, setIsSending] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsSending(true);
    try {
      const response = await axios.post('/api/tasks', data);
      if (response.status === 201) {
        toast.success(response.data.msg, {
          position: 'top-center',
          duration: 5000,
        });
        reset();
      } else {
        const error = response.data.error;
        toast.error(error.err, {
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
      className={`flex flex-col gap-2 md:w-1/2 mx-auto relative px-5 border py-5 rounded-md lg:w-1/3 ${
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

      <Select
        label='privacy'
        {...register('privacy')}
        error={errors?.privacy?.message}
        required
      >
        <option value=''></option>
        <option value='PUBLIC'>public</option>
        <option value='PRIVATE'>private</option>
      </Select>
      <Button
        size={'sm'}
        type='submit'
        className='capitalize text-lg dark:btn-gradient bg-yellow-500 mt-3 md:w-2/3 md:self-center'
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
