'use client';
import { useState, useContext, createContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

type TasksContextType = {
  tasks: Task[];
  isLoading: boolean;
  updateTaskStatus: (id: string) => void;
  isUpdating: boolean;
  deleteTask: (id: string) => void;
  newTask: (data: NewTask) => Promise<{ status: string; message: string }>;
};
const TasksContext = createContext<TasksContextType | null>(null);

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isUpdating, setisUpdating] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/tasks`);
      if (res.status !== 200) {
        toast.error('error fetching tasks');
      } else {
        setTasks(res.data);
      }
    } catch (error) {
      toast.error('error fetching tasks');
    } finally {
      setIsLoading(false);
    }
  };

  // update status of a task
  const updateTaskStatus = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    const status = task?.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/tasks/${id}`,
        { status }
      );
      if (res.status !== 201) {
        toast.error(res.data.error.err);
      } else {
        toast.success(res.data.msg);
        const updatedTasks = tasks.map((task) => {
          if (task.id === id) {
            task.status = status;
          }
          return task;
        });
        setTasks(updatedTasks);
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  // delete a task
  const deleteTask = async (id: string) => {
    setisUpdating(true);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/api/tasks/${id}`
      );
      console.log(res);
      if (res.status !== 200) {
        toast.error('Task could not be deleted! please try again');
      } else {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error('Task could not be deleted! please try again');
      console.log(error);
    } finally {
      setisUpdating(false);
    }
  };

  // create a task
  const newTask = async (formData: NewTask) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/tasks/`,
        formData
      );

      if (res.status === 201) {
        return {
          status: 'success',
          message: res.data.msg,
        };
      } else {
        const error = res.data.error;
        return {
          status: 'failed',
          message: error.err,
        };
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const contextValue = {
    tasks,
    isLoading,
    updateTaskStatus,
    isUpdating,
    deleteTask,
    newTask,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

const useTask = () => useContext(TasksContext) as TasksContextType;

export { TaskContextProvider, useTask };
