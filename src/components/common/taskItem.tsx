'use client';
import { cn } from '@/src/lib/utils';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useTask } from '../context/TasksContext';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {
  getDueDate,
  dateString,
  calculatePriority,
} from '@/src/utils/task/helpers';
import { Icons } from '../icons';

type Props = Task & {
  className?: string;
};

const taskVariants = cva(
  'py-4 md:py-7 rounded-md px-7 relative border hover:shadow-ml flex flex-col gap-5',
  {
    variants: {
      variant: {
        backlog:
          'before:content-[""] before:absolute before:w-4 before:top-1/2 before:bottom-2  before:border-l-2 before:left-3 before:border-light-blue before:-translate-y-1/2 before:h-3/4',
        completed: 'text-center',
      },
      background: {
        gradient: 'btn-gradient',
        normal: '',
      },
      priority: {
        low: 'before:border-priority-low',
        medium: 'before:border-priority-medium',
        high: 'before:border-priority-high',
        none: 'before:border-none',
      },
    },
    defaultVariants: {
      variant: 'backlog',
      background: 'normal',
      priority: 'low',
    },
  }
);

export default function TaskItem(props: Props) {
  const { title, className, id, dueDate, completed, public: isPublic } = props;
  const [checked, setChecked] = useState(completed);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const timeLeft = getDueDate(new Date(dueDate));
  const dueDateDisplay = dateString(timeLeft);
  const currentStatus = !completed ? dueDateDisplay : null;
  const priority = completed ? 'none' : calculatePriority(timeLeft);
  const { updateTaskStatus, deleteTask } = useTask();

  const handleChecked = () => {
    setChecked((prev) => !prev);
    updateTaskStatus(id);
  };

  const toggleDeleteModal = () => {
    setDeleteOpen((prev) => !prev);
  };

  // trim title if it's too long
  const maxLength = 100;

  const displayedTitle =
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

  return (
    <Link href={`/tasks/${id}`}>
      <article className={cn(taskVariants({ priority }), className)}>
        <div className='flex items-center gap-3 min-h-fit'>
          <div>
            <Checkbox.Root
              className={cn(
                'flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]',
                checked && 'bg-transparent shadow-none'
              )}
              checked={checked}
              onCheckedChange={handleChecked}
              onClick={(e) => {
                e.preventDefault();
                handleChecked();
              }}
            >
              <Checkbox.Indicator className='text-violet11' asChild>
                <Icons.check
                  color='#1cdf3d'
                  strokeWidth={2}
                  absoluteStrokeWidth
                  size={40}
                />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>

          <p className='capitalize'> {displayedTitle}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p>{currentStatus}</p>
          <div className='flex justify-end '>
            {/* <Button
              variant={'ghost'}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Icons.nudge />
            </Button>
            <Button
              variant={'ghost'}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <MessageSquare />
            </Button> */}
            <AlertDialog.Root
              open={deleteOpen}
              onOpenChange={toggleDeleteModal}
            >
              <AlertDialog.Trigger>
                <Button
                  variant={'ghost'}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDeleteModal();
                  }}
                  className={`disabled:cursor-not-allowed disabled:opacity-30`}
                  disabled={!completed && isPublic ? true : false}
                >
                  <Icons.delete />
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay
                  className='bg-black bg-opacity-50 data-[state=open]:animate-overlayShow fixed inset-0'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDeleteModal();
                  }}
                />
                <AlertDialog.Content
                  className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-body-light p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-30'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <AlertDialog.Title className='font-semibold m-0 text-lg text-black'>
                    Are you absolutely sure?
                  </AlertDialog.Title>
                  <AlertDialog.Description className='text-black mt-4 mb-5 text-base leading-normal'>
                    This action cannot be undone. This will permanently delete
                    this task from our servers.
                  </AlertDialog.Description>
                  <div className='flex justify-end gap-[25px]'>
                    <AlertDialog.Cancel asChild>
                      <Button
                        className='text-black bg-blue-500  inline-flex py-1 items-center justify-center rounded-[4px] px-[15px] 
                        border-none
                        font-medium leading-none outline-none focus:shadow-[0_0_0_2px] hover:bg-blue-300'
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDeleteModal();
                        }}
                      >
                        Cancel
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <Button
                        className='text-red11 bg-destructive hover:bg-red-400 focus:shadow-red-200 inline-flex py-1 items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTask(id);
                          toggleDeleteModal();
                        }}
                      >
                        Yes, delete task
                      </Button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      </article>
    </Link>
  );
}
