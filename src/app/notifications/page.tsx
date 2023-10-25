import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNotifications } from '@/src/utils/task/fetch';
import NotificationList from './components/notification-list';

export default async function page() {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['notifications'],
  //   queryFn: () => getNotifications(),
  //   staleTime: 5 * 60 * 1000,
  // });
  return (
    <>
      <h2 className='text-center font-bold capitalize text-lg pb-4 '>
        notifications
      </h2>
      <NotificationList />
    </>
  );
}
