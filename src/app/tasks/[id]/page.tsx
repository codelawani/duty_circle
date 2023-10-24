import { Button } from '@/src/components/ui/button';
import { getDueDate, dateString as getString } from '@/src/utils/task/helpers';
import axios from 'axios';
import { FlameIcon, MessageSquare } from 'lucide-react';
// import { getServerSession } from 'next-auth';
// import authOptions from '@/src/lib/auth';

type Props = {
  params: {
    id: string;
  };
};

export default async function page(props: Props) {
  const {
    params: { id },
  } = props;
  const taskData: Promise<Task> = await fetchTask(id);
  // const session = await getServerSession(authOptions);
  const {
    title,
    description,
    completed,
    dueDate,
    createdAt,
    tags,
    // user: { username },
  } = await taskData;
  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });

  const timeLeft = getDueDate(new Date(dueDate));
  const dueDateDisplay = getString(timeLeft);

  return (
    <main className=''>
      {/* <div className='flex items-center gap-1'>
        <div className='w-10 h-10'>
          <Image
            src={image ? image : '/default_avatar.png'}
            width={50}
            height={50}
            alt={`profile of ${username}`}
            className='rounded-full border w-full h-full object-cover object-center'
          />
        </div>
        <p className=''>@{username}</p>
      
      </div> */}
      <h3 className='font-semibold'>{title}</h3>
      <p>{description}</p>
      <div className='flex gap-3 py-2'>
        <h4>status: </h4>
        <p className=''>{completed ? 'completed' : dueDateDisplay}</p>
      </div>

      <p className='py-3'>{dateString}</p>

      <ul className='flex gap-1 items-center'>
        {tags?.map(({ name }) => (
          <li
            key={name}
            className='bg-accent text-accent-foreground px-2 rounded-lg'
          >
            {name}
          </li>
        ))}
      </ul>
      <div className='flex border-y my-5 '>
        <Button variant={'ghost'}>
          <FlameIcon />
        </Button>
        <Button variant={'ghost'}>
          <MessageSquare />
        </Button>
      </div>

      <p>list of comments</p>
    </main>
  );
}

const fetchTask = async (id: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tasks/${id}`);
  if (!res.ok) {
    throw new Error('Error fetching task!');
  }
  return res.json();
};

const Card = ({ heading, content }: { heading: string; content: string }) => {
  return (
    <div className='dark:bg-body-300 dark:text-white flex flex-col md:flex-row md:gap-10 w-fit px-5 py-2'>
      <h3 className='font-medium text-base uppercase'>{heading}</h3>
      <p>{content}</p>
    </div>
  );
};
