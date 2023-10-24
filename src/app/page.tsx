import FeedItem from '../components/common/feed-item';
import TaskItem from '../components/common/taskItem';
import FeedList from '../components/homepage/feed-list';
import { Button } from '../components/ui/button';

async function getFeed() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/feed`, {
    next: {
      revalidate: 100,
    },
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
      <FeedList feed={feed} />
    </>
  );
}
