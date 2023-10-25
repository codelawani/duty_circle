'use client';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/src/utils/task/fetch';
import Image from 'next/image';

export default function NotificationList() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });
  console.log(notifications);
  if (notifications === undefined) return <></>;
  return (
    <>
      {notifications.map((notification) => (
        <Card key={notification.id} {...notification} />
      ))}
    </>
  );
}

const Card = (notification: UserNotification) => {
  const { content, sender } = notification;

  return (
    <div
      className={`border-b border-gray-700 last:border-0 py-2 dark:hover:bg-opacity-20 hover:bg-opacity-50 cursor-default hover:bg-gray-300 px-2`}
    >
      {sender && (
        <div className='flex items-start gap-1 flex-col'>
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
