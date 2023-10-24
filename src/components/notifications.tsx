'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Icons } from './icons';
import useNotification from './hooks/useNotification';

export default function Notifications() {
  const { notifications } = useNotification();
  const unreadNotifications = notifications.filter(
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
          className='w-fit 
                  bg-second-light dark:bg-second-dark px-5 py-3
                  rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] :animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] flex flex-col gap-2'
          sideOffset={5}
        >
          {notifications.map((notification) => (
            <Card key={notification.id} {...notification} />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const Card = (notification: UserNotification) => {
  const { seen, content, type } = notification;

  return (
    <DropdownMenu.Item
      className={`${
        seen ? '' : 'bg-gray-300 dark:bg-opacity-20 rounded-md py-1 px-2'
      } `}
    >
      {type === 'NEW_NUDGE' && <h6>{`User sent you a nudge!`}</h6>}
      <p>{content}</p>
    </DropdownMenu.Item>
  );
};
