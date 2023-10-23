'use client';

import TaskItem from '@/src/components/common/taskItem';
import { useTask } from '@/src/components/context/TasksContext';
import TasksSkeleton from '@/src/components/loaders/TasksSkeleton';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export default function TasksList() {
  const { tasks, isLoading } = useTask();
  const pending = tasks.filter((task) => task.status === 'PENDING');
  const completed = tasks.filter((task) => task.status === 'COMPLETED');
  if (isLoading) return <TasksSkeleton />;

  return (
    <section className='relative'>
      <div className='fixed md:relative bottom-5 right-5 z-20 md:bottom-0 md:flex md:justify-end'>
        <Link
          href={'/tasks/new'}
          className='dark:btn-gradient px-5 py-2 capitalize'
        >
          new
        </Link>
      </div>
      <article>
        <h2 className='uppercase text-center py-3 font-normal text-base'>
          backlogs
        </h2>
        <div>
          {' '}
          {pending.length > 0 ? (
            pending.map(({ title, id, dueDate, status }) => {
              return (
                <TaskItem
                  key={id}
                  className=''
                  title={title}
                  id={id}
                  due={dueDate}
                  status={status}
                />
              );
            })
          ) : (
            <div className='flex flex-col justify-center items-center gap-4'>
              <p className='capitalize text-center'>empty backlog...</p>
              <Button className='btn-gradient capitalize'>
                <Link href={'/tasks/new'}>add task</Link>
              </Button>
            </div>
          )}
        </div>
      </article>
      <article>
        <h2 className='uppercase text-center py-3 font-normal text-base'>
          completed
        </h2>
        <div>
          {completed.length > 0 ? (
            completed.map(({ title, id, dueDate, status }) => {
              return (
                <TaskItem
                  key={id}
                  className=''
                  title={title}
                  id={id}
                  due={dueDate}
                  status={status}
                />
              );
            })
          ) : (
            <p> no completed tasks</p>
          )}
        </div>
      </article>
    </section>
  );
}
