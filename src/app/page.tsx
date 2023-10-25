import Link from 'next/link';
import FeedList from '../components/homepage/feed-list';

async function getFeed(page: number) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/feed?page=${page}&size=20`,
    {
      cache: 'no-cache',
    }
  );
  if (!res.ok) {
    throw new Error('error loading feed');
  }
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? 1);
  const feedData: Promise<Task[]> = await getFeed(page);
  const feed = await feedData;
  return (
    <>
      <h2 className='text-center font-bold capitalize text-lg pb-4 '>
        public feed
      </h2>
      <FeedList feed={feed} />
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
          } capitalize bg-primary px-5 py-1 rounded-md text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-100`}
        >
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
          className={` capitalize bg-primary px-5 py-1 rounded-md text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-100`}
        >
          next
        </Link>
      </div>
    </>
  );
}
