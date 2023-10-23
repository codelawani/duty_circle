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
    status,
    dueDate,
    createdAt,
    username = 'john smith',
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
      {/* <Image/> */}
      <h2>{username}</h2>
      <h3 className='font-semibold'>{title}</h3>
      <p>{description}</p>
      <div className='flex gap-3 py-2'>
        <h4>status: </h4>
        <p className=''>
          {status === 'COMPLETED' ? 'completed' : dueDateDisplay}
        </p>
      </div>

      <p className='py-3'>{dateString}</p>
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
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/tasks/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Card = ({ heading, content }: { heading: string; content: string }) => {
  return (
    <div className='dark:bg-body-300 dark:text-white flex flex-col md:flex-row md:gap-10 w-fit px-5 py-2'>
      <h3 className='font-medium text-base uppercase'>{heading}</h3>
      <p>{content}</p>
    </div>
  );
};
