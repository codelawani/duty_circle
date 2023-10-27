'use client';
import { useSession } from 'next-auth/react';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import ToolTip from '../common/tool-tip';

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
    setNudge((prev) => prev + 1);
    try {
      const res = await axios.post('/api/nudges', nudgedata);
      if (res.status !== 200) {
        setNudge((prev) => prev - 1);
      }
    } catch (error) {
      setNudge((prev) => prev - 1);
      // console.log(error);
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
        className='disabled:cursor-not-allowed duration-300 transition-colors active:scale-90 group flex items-end gap-1   relative'
      >
        <Icons.nudge className='group-active:text-red-900 transition-colors group-active:animate-in group-active:fill-red-900' />
        <span>{nudge}</span>
      </Button>
    </ToolTip>
  );
}
