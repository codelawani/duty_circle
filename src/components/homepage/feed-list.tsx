
import FeedItem from '../common/feed-item';

type Props = {
  feed: Task[];
};

export default function FeedList({ feed }: Props) {
  return (
    <div className='first-of-type:border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {feed.length > 0 ? (
        feed.map((task) => <FeedItem key={task.id} {...task} />)
      ) : (
        <p className='text-center py-6 capitalize md:col-span-2 lg:col-span-3'>
          empty feed
        </p>
      )}
    </div>
  );
}
