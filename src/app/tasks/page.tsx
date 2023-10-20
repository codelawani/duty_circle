import TaskItem from '@/src/components/common/taskItem';
import axios from 'axios';
import Link from 'next/link';

async function getTasks() {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/tasks`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function page() {
  const data: Promise<Task[]> = await getTasks();
  const feeds = await data;
  console.log(feeds);
  const backlogs = feeds.filter((feed) => feed.status === 'PENDING');
  const completed = feeds.filter((feed) => feed.status === 'COMPLETED');
  return (
    <main className='px-5 relative min-h-screen'>
      <h2 className='uppercase text-center py-3 font-normal text-base'>
        backlogs
      </h2>
      <ul className='flex flex-col gap-2 md:w-1/2 mx-auto'>
        {backlogs.length > 0 ? (
          backlogs.map(({ title, id }) => {
            return (
              <TaskItem
                key={id}
                className=''
                name={title}
                priority='low'
                id={id}
              />
            );
          })
        ) : (
          <li className='text-center bg-body-300 w-fit self-center px-7 py-2 rounded-md'>
            no backlogs...
          </li>
        )}
      </ul>

      <h2 className='uppercase text-center py-3 font-normal text-base'>
        completed
      </h2>
      <ul className='flex flex-col gap-2 md:w-1/2 mx-auto'>
        {completed.length > 0 ? (
          backlogs.map(({ title, id }) => {
            return (
              <TaskItem
                key={id}
                className=''
                name={title}
                priority='low'
                id={id}
              />
            );
          })
        ) : (
          <li className='text-center bg-body-300 w-fit self-center px-7 py-2 rounded-md'>
            none yet...
          </li>
        )}
      </ul>
      <Link
        href={'/tasks/new'}
        className='dark:btn-gradient px-5 py-2 capitalize absolute bottom-5 mx-auto'
      >
        new
      </Link>
    </main>
  );
}
