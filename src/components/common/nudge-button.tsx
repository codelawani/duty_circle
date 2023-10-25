'use client';
import { useSession } from 'next-auth/react';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import ToolTip from './tool-tip';
import SmallLoader from '../loaders/SmallLoader';

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

  const [nudge, setNudge] = useState(nudgeCount);
  const [isSending, setIsSending] = useState(false);

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
      setIsSending(true);
      const res = await axios.post('/api/nudges', nudgedata);
      if (res.status === 200) {
        setNudge((prev) => prev + 1);
        // toast.success('encouragement sent!', {
        //   duration: 5000,
        //   position: 'top-right',
        // });
      } else {
        toast.error('encouragement not sent! please try again', {
          duration: 5000,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error('failed!');
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ToolTip content='send encouragement/nudge'>
      <Button
        variant={'ghost'}
        onClick={(e) => {
          e.preventDefault();
          sendNudge(taskId);
        }}
        disabled={userId === ownerId ? true : false}
        className='disabled:cursor-not-allowed duration-300 transition-colors active:scale-90 group flex items-end gap-1 active:bg-priority-high  relative'
      >
        <span>{nudge}</span>
        <Icons.nudge className='group-active:text-red-900 transition-colors group-active:animate-in group-active:fill-red-900' />
        {isSending && <SmallLoader size={20} />}
      </Button>
    </ToolTip>
  );
}
