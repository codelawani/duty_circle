'use client';
import { useQuery } from '@tanstack/react-query';
import FeedItem from '../common/feed-item';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '../icons';
import { getFeed } from '@/src/utils/task/fetch';

export default function FeedList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const { data: feed } = useQuery({
    queryKey: ['feed', page],
    queryFn: () => getFeed(page),
  });
  if (feed === undefined) return <></>;

  return (
    <div>
      <div className='first-of-type:border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {feed.length > 0 ? (
          feed.map((task) => <FeedItem key={task.id} {...task} />)
        ) : (
          <p className='text-center py-6 capitalize md:col-span-2 lg:col-span-3'>
            empty feeds
          </p>
        )}
      </div>
      <div className='flex justify-between items-center py-8'>
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
          className={` capitalize bg-primary px-5 py-1 rounded-md text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-100 flex items-center gap-2`}
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
