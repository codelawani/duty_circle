import FeedItem from '../components/common/feed-item';
import TaskItem from '../components/common/taskItem';
import { Button } from '../components/ui/button';

async function getFeed() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/feed`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error('error loading feed');
  }

  return res.json();
}

export default async function Home() {
  const feedData: Promise<Task[]> = await getFeed();
  const feed = await feedData;
  return (
    <>
      <h2 className='text-center font-bold capitalize text-lg pb-4 '>
        public feed
      </h2>
      <div className='first-of-type:border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {feed.length > 0
          ? feed.map((task) => <FeedItem key={task.id} {...task} />)
          : null}
      </div>
    </>
  );
}
