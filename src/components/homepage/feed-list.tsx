'use client';
import { useEffect, useState } from 'react';
import FeedItem from '../common/feed-item';

type Props = {
  feed: Task[];
};

export default function FeedList({ feed }: Props) {
  const [data, setData] = useState(feed);

  useEffect(() => {
    setData(feed);
  }, [feed]);
  return (
    <div className='first-of-type:border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {data.length > 0 ? (
        data.map((task) => <FeedItem key={task.id} {...task} />)
      ) : (
        <p>empty feed</p>
      )}
    </div>
  );
}
