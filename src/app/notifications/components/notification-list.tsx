'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotifications } from '@/src/utils/task/fetch';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import axios from 'axios';

export default function NotificationList() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => {
      return axios.put(`/api/notifications/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // check if there's any unread notification so the useEffect is triggered
  const isUnread = useMemo(() => {
    return notifications?.some((notification) => !notification.seen);
  }, [notifications]);

  useEffect(() => {
    if (isUnread) {
      markNotificationAsRead();
    }
  }, [isUnread]);

  const markNotificationAsRead = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log('failed to update notification');
    }
  };

  if (notifications === undefined) return <></>;
  return (
    <div className='flex flex-col gap-5 '>
      {notifications.map((notification) => (
        <Card key={notification.id} {...notification} />
      ))}
    </div>
  );
}

const Card = (notification: UserNotification) => {
  const { content, sender, seen } = notification;

  return (
    <div
      className={`${
        !seen && 'bg-gray-200/10'
      } border-b border-gray-700 last:border-0 py-2 dark:hover:bg-opacity-20 hover:bg-opacity-50 cursor-default hover:bg-gray-300 px-4 rounded-md md:py-4 md:w-fit`}
    >
      {sender && (
        <div className='flex items-center gap-2'>
          <div className='w-10 h-10'>
            <Image
              src={sender?.image ? sender.image : '/default_avatar.png'}
              width={50}
              height={50}
              alt={`profile of ${sender?.username}`}
              className='rounded-full border w-full h-full object-cover object-center'
            />
          </div>

          {sender && <p className=''>@{sender?.username}</p>}
        </div>
      )}
      <p>{content}</p>
    </div>
  );
};
