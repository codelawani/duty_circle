import { cn } from '@/src/lib/utils';
import { cva } from 'class-variance-authority';
import Link from 'next/link';

type Props = {
  name: string;
  priority: 'low' | 'medium' | 'high';
  className?: string;
  id: string;
};

const taskVariants = cva('py-2 px-7 capitalize relative dark:text-white', {
  variants: {
    variant: {
      backlog:
        'before:content-[""] before:absolute before:w-4 before:top-2 before:bottom-2  before:border-l-2 before:left-3 before:border-light-blue',
      completed: 'text-center',
    },
    background: {
      gradient: 'btn-gradient',
      normal: 'bg-body-300',
    },
    priority: {
      low: '',
      medium: '',
      high: '',
    },
  },
  defaultVariants: {
    variant: 'backlog',
    background: 'normal',
    priority: 'low',
  },
});

export default function TaskItem(props: Props) {
  const { name, priority, className, id } = props;
  return (
    <Link href={`/tasks/${id}`}>
      <li className={cn(taskVariants({ priority }), className)}>{name}</li>
    </Link>
  );
}
