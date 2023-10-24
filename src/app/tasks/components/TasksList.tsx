'use client';

import TaskItem from '@/src/components/common/taskItem';
import { useTask } from '@/src/components/context/TasksContext';
import TasksSkeleton from '@/src/components/loaders/TasksSkeleton';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import * as Tabs from '@radix-ui/react-tabs';
import SmallLoader from '@/src/components/loaders/SmallLoader';

export default function TasksList() {
  const { tasks, isLoading, isUpdating } = useTask();
  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);
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

      <Tabs.Root defaultValue='backlogs'>
        <Tabs.List className='flex gap-20 mb-10'>
          <Tabs.Trigger
            className={
              'data-[state=active]:text-cool-light data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]  outline-none cursor-pointer uppercase'
            }
            value='backlogs'
          >
            backlogs
          </Tabs.Trigger>
          <Tabs.Trigger
            className={
              'data-[state=active]:text-cool-light data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]  outline-none cursor-pointer uppercase'
            }
            value='completed'
          >
            completed
          </Tabs.Trigger>
        </Tabs.List>
        {/* show loader when making changes to task */}
        {isUpdating && <SmallLoader />}
        <Tabs.Content value='backlogs'>
          <article>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
              {' '}
              {pending.length > 0 ? (
                pending.map(({ id, ...others }) => {
                  return <TaskItem key={id} id={id} {...others} />;
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
        </Tabs.Content>

        <Tabs.Content value='completed'>
          <article>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
              {completed.length > 0 ? (
                completed.map(({ id, ...others }) => {
                  return <TaskItem key={id} id={id} {...others} />;
                })
              ) : (
                <p> no completed tasks</p>
              )}
            </div>
          </article>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
