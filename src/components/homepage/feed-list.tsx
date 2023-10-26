'use client';
import { useQuery } from '@tanstack/react-query';
import FeedItem from '../common/feed-item';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '../icons';
import { getFeed } from '@/src/utils/task/fetch';
import { useMemo } from 'react';

export default function FeedList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const tag = searchParams.get('tag') ?? '';
  const { data } = useQuery({
    queryKey: ['feed', page],
    queryFn: () => getFeed(page),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
  const publicFeed = useMemo(() => {
    return data?.tasks.filter((task) => task.public);
  }, [data?.tasks]);

  if (publicFeed === undefined) return <></>;

  return (
    <div>
      <div className='first-of-type:border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {publicFeed.length > 0 ? (
          publicFeed.map((task) => <FeedItem key={task.id} {...task} />)
        ) : (
          <p className='text-center py-6 capitalize md:col-span-2 lg:col-span-3'>
            nothing yet...
          </p>
        )}
      </div>
      <div className='flex justify-between items-center py-8 '>
        <Link
          href={{
            pathname: '/',
            query: {
              page: page - 1,
            },
          }}
          className={`${
            page === 1 ? 'invisible' : 'visible'
          } capitalize bg-primary px-5 py-1 rounded-md text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-100 flex items-center gap-2`}
        >
          <span>
            <Icons.leftArrow />
          </span>
          prev
        </Link>
        {/* <p>{page}</p> */}
        <Link
          href={{
            pathname: '/',
            query: {
              page: page + 1,
            },
          }}
          className={`${publicFeed.length < 20 && 'invisible'} ${
            page === data?.totalPages ? 'invisible' : 'visible'
          } capitalize bg-primary px-5 py-1 rounded-md text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-100 flex items-center gap-2`}
        >
          next
          <span>
            <Icons.rightArrow />
          </span>
        </Link>
      </div>
    </div>
  );
}
