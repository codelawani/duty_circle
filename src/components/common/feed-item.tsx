'use client';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import {
  CheckCircle2,
  FlameIcon,
  MessageSquare,
  UserPlus2,
} from 'lucide-react';
import { Button } from '../ui/button';

import {
  getDueDate,
  dateString,
  calculatePriority,
} from '@/src/utils/task/helpers';
import Image from 'next/image';

export default function FeedItem(props: Task) {
  const { title, id, username, dueDate, status } = props;

  const timeLeft = getDueDate(new Date(dueDate));
  const dueDateDisplay = dateString(timeLeft);
  const currentStatus = status === 'PENDING' ? dueDateDisplay : null;
  const priority = calculatePriority(timeLeft);
  const maxLength = 100;

  const displayedTitle =
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  return (
    <Link href={`/tasks/${id}`}>
      <article
        className={cn(
          priority,
          'py-2 px-7 relative border-b min-h-[12rem] border-r flex flex-col gap-3 hover:shadow-ml'
        )}
      >
        <div className='flex items-center gap-1'>
          {/* <Image
            src={''}
            width={100}
            height={100}
            alt={`profile of ${username}`}
            className='rounded-full border'
          /> */}
          <p className=''>{username}</p>
          {/* <Button
            variant={'ghost'}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <UserPlus2 />
          </Button> */}
        </div>
        <div className='flex items-center gap-3'>
          {status === 'COMPLETED' && (
            <div className=''>
              <CheckCircle2
                color='#1cdf3d'
                strokeWidth={2}
                absoluteStrokeWidth
                size={40}
              />
            </div>
          )}
          <p className='capitalize'> {displayedTitle}</p>
        </div>
        <div className='flex justify-between items-center mt-auto'>
          <p>{currentStatus}</p>
          <div className='flex justify-end '>
            <Button
              variant={'ghost'}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <FlameIcon />
            </Button>
            <Button
              variant={'ghost'}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <MessageSquare />
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
