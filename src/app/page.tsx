import FeedList from '../components/homepage/feed-list';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getFeed } from '@/src/utils/task/fetch';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? 1);

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h2 className='text-center font-bold capitalize text-lg pb-4 '>
        public feed
      </h2>

      <FeedList />
    </HydrationBoundary>
  );
}
