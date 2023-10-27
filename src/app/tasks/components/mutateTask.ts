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
    onMutate: async (updatedTask) => {
      // cancel any outgoing refetch
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // previous tasks list values
      const prevTasks: Task[] = queryClient.getQueryData(['tasks']) as Task[];

      const prevTaskState = prevTasks.find(
        (task) => task.id === updatedTask.id
      );

      // optimistically update the tasks list
      queryClient.setQueryData(['tasks'], (prevData: Task[]) => [
        { ...prevTaskState, ...updatedTask.body },
        ...prevData,
      ]);
      // return a context with the snapshot of the tasks before the optimistic update
      return { prevTasks };
    },
    onError: (err, body, context) => {
      queryClient.setQueryData(['tasks'], context?.prevTasks);
    },

    onSettled: () => {
      // refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/tasks/${id}`);
    },
    onMutate: async (id) => {
      // cancel any outgoing refetch
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // previous tasks list values
      const prevTasks: Task[] = queryClient.getQueryData(['tasks']) as Task[];

      // optimistically update the tasks list
      queryClient.setQueryData(['tasks'], (prevData: Task[]) => {
        return prevData.filter((task) => task.id !== id);
      });
      // return a context with the snapshot of the tasks before the optimistic update
      return { prevTasks };
    },
    onError: (err, body, context) => {
      queryClient.setQueryData(['tasks'], context?.prevTasks);
    },

    onSettled: () => {
      // refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { newTask, updateTask, isSending, deleteTask };
}
