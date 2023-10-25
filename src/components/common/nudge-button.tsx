'use client';
import { useSession } from 'next-auth/react';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';

type Props = {
  ownerId: string;
  nudgeCount: number;
  taskId: string;
};

export default function NudgeButton({
  ownerId,
  taskId,
  nudgeCount = 0,
}: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;

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
    <Button
      variant={'ghost'}
      onClick={(e) => {
        e.preventDefault();
        sendNudge(taskId);
      }}
      disabled={userId === ownerId ? true : false}
      className='disabled:cursor-not-allowed duration-[60s] transition-colors active:scale-95 group flex items-end gap-1 active:btn-gradient'
    >
      <span>{nudgeCount}</span>
      <Icons.nudge className='group-active:text-red-900 transition-colors group-active:animate-in group-active:fill-red-900' />
    </Button>
  );
}
