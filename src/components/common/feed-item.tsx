'use client';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';

import { getDueDate, dateString } from '@/src/utils/task/helpers';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Icons } from '../icons';
import NudgeButton from './nudge-button';

export default function FeedItem(props: Task) {
  const {
    title,
    id,
    user: { username, image, id: ownerId },
    dueDate,
    completed,
    tags,
  } = props;

  const session = useSession();
  const userId = session?.data?.user?.id;

  const timeLeft = getDueDate(new Date(dueDate));
  const dueDateDisplay = dateString(timeLeft);
  const currentStatus = !completed ? dueDateDisplay : null;
  // const priority = calculatePriority(timeLeft);
  const maxLength = 100;

  const displayedTitle =
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

  const maxTags = 3;
  const requiredTags = tags?.slice(0, maxTags);

  // send encouragement to a user
  const sendNudge = async (id: string) => {
    if (session.status === 'unauthenticated') {
      toast.error('signin to send encouragement!', {
        duration: 3000,
      });
      return;
    }
    const nudgedata = {
      senderId: userId,
      taskId: id,
    };
    try {
      const res = await axios.post('/api/nudges', nudgedata);
      if (res.status === 200) {
        toast.success('encouragement sent!', {
          duration: 5000,
          position: 'top-right',
        });
      } else {
        toast.error('encouragement not sent! please try again', {
          duration: 5000,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error('failed!');
      console.log(error);
    }
  };

  return (
    <Link href={`/tasks/${id}`}>
      <article
        className={cn(
          'py-2 px-7 relative border-b h-fit md:min-h-[13rem]  border-r flex flex-col gap-3 hover:shadow-ml'
        )}
      >
        <div className='flex items-center gap-1'>
          <div className='w-10 h-10'>
            <Image
              src={image ? image : '/default_avatar.png'}
              width={50}
              height={50}
              alt={`profile of ${username}`}
              className='rounded-full border w-full h-full object-cover object-center'
            />
          </div>
          <p className=''>@{username}</p>
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
          {completed && (
            <div className=''>
              <Icons.check
                color='#1cdf3d'
                strokeWidth={2}
                absoluteStrokeWidth
                size={40}
              />
            </div>
          )}
          <p className='capitalize'> {displayedTitle}</p>
        </div>
        <ul className='flex gap-1 items-center'>
          {requiredTags?.map(({ name }) => (
            <li
              key={name}
              className='bg-accent text-accent-foreground px-2 rounded-lg'
            >
              {name}
            </li>
          ))}
        </ul>
        <div className='flex justify-between items-center mt-auto'>
          <p>{currentStatus}</p>
          <div className='flex justify-end '>
            <NudgeButton taskId={id} ownerId={ownerId} />
            {/* <Button
              variant={'ghost'}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <MessageSquare />
            </Button> */}
          </div>
        </div>
      </article>
    </Link>
  );
}
