'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Icons } from './icons';
import useNotification from './hooks/useNotification';
import Image from 'next/image';

export default function Notifications() {
  const { notifications } = useNotification();
  const unreadNotifications = notifications?.filter(
    (notification) => !notification.seen
  );
  const unread = unreadNotifications?.length ?? 0;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='relative hover:bg-accent hover:text-accent-foreground  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background h-9 px-3 rounded-md'>
        <Icons.notification className='h-5 w-5' />
        {unread > 0 && (
          <span className='absolute right-1 top-0 border-none w-4 h-4 rounded-full bg-red-900  text-white font-bold text-xs font-mono'>
            {unread}
          </span>
        )}
        <span className='sr-only'>notifications</span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=' 
                  bg-body-light dark:bg-body-dark px-5 py-3
                  rounded-md p-[5px]  will-change-[opacity,transform] :animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] flex flex-col gap-2 max-h-[65vh]  md:max-h-[70vh]
                  w-[60%]
                  mx-auto
                  lg:w-fit
                  overflow-y-scroll min-h-fit shadow-ml'
          sideOffset={10}
        >
          <DropdownMenu.Arrow className='dark:fill-body-dark fill-body-light' />

          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} {...notification} />
            ))
          ) : (
            <DropdownMenu.Item>no new notifications...</DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const Card = (notification: UserNotification) => {
  const { content, sender } = notification;

  return (
    <DropdownMenu.Item
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
    </DropdownMenu.Item>
  );
};
