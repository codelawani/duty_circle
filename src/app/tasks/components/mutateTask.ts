'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function useMutate() {
  const queryClient = useQueryClient();
  const { mutateAsync: newTask, isPending: isSending } = useMutation({
    mutationFn: (data: NewTask) => {
      return axios.post('/api/tasks', data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['tasks'], (prev: Task[]) => {
        if (prev === undefined) {
          return [data.data];
        } else {
          return [data.data, ...prev];
        }
      });
    },
  });
  const { mutateAsync: updateTask, isSuccess } = useMutation({
    mutationFn: (data: {
      id: string;
      body: { completed: boolean; title: string };
    }) => {
      return axios.put(`/api/tasks/${data.id}`, data.body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/tasks/${id}`);
    },
    // onSuccess: (data) => {
    //   //  queryClient.invalidateQueries({ queryKey: ['tasks'] });
    // },
  });

  return { newTask, updateTask, isSending, deleteTask };
}
