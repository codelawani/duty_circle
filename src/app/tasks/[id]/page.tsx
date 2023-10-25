import { Button } from '@/src/components/ui/button';
import { getDueDate, dateString as getString } from '@/src/utils/task/helpers';
import { FlameIcon, MessageSquare } from 'lucide-react';
import { getServerSession } from 'next-auth';
import authOptions from '@/src/lib/auth';
import Image from 'next/image';
import { Icons } from '@/src/components/icons';
import NudgeButton from '@/src/components/common/nudge-button';

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
  const session = await getServerSession(authOptions);
  const {
    title,
    description,
    completed,
    dueDate,
    consequence,
    tags,
    nudgeCount,
    user: { username, image, name, id: ownerId },
  } = await taskData;
  const date = new Date(dueDate);
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
    <main className='md:py-10 px-12'>
      <div className='flex items-center gap-1 pb-3'>
        <div className='w-16 h-16'>
          <Image
            src={image ? image : '/default_avatar.png'}
            width={300}
            height={300}
            alt={`profile of ${username}`}
            className='rounded-full border w-full h-full object-cover object-center'
          />
        </div>
        <p className=''>
          {name} @{username}
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <h3 className='font-semibold py-3 text-lg'>{title}</h3>
        {completed && (
          <div className=''>
            <Icons.check
              color='#1cdf3d'
              strokeWidth={2}
              absoluteStrokeWidth
              size={20}
            />
          </div>
        )}
      </div>
      <p>{description}</p>
      <p className='text-red-300'>{consequence}</p>
      {/* <div className='flex gap-3 py-2'>
        <h4>status: </h4>
        <p className=''>{completed ? 'completed' : dueDateDisplay}</p>
      </div> */}

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
      <div className='flex border-y my-5  md:max-w-[50%]'>
        {/* <Button variant={'ghost'} className='flex items-center gap-1'>
          <span>{nudgeCount}</span>
          <FlameIcon />
        </Button> */}
        <NudgeButton taskId={id} ownerId={ownerId} />
        <Button variant={'ghost'}>
          <MessageSquare />
        </Button>
      </div>

      {/* <p>list of comments</p> */}
    </main>
  );
}

const fetchTask = async (id: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tasks/${id}`, {
    cache: 'no-cache',
  });
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

// send encouragement to a user
const sendNudge = async (id: string) => {
  // if (session.status === 'unauthenticated') {
  //   toast.error('signin to send encouragement!', {
  //     duration: 3000,
  //   });
  //   return;
  // }
  // const nudgedata = {
  //   senderId: userId,
  //   taskId: id,
  // };
  // try {
  //   const res = await axios.post('/api/nudges', nudgedata);
  //   if (res.status === 200) {
  //     toast.success('encouragement sent!', {
  //       duration: 5000,
  //       position: 'top-right',
  //     });
  //   } else {
  //     toast.error('encouragement not sent! please try again', {
  //       duration: 5000,
  //       position: 'top-right',
  //     });
  //   }
  // } catch (error) {
  //   toast.error('failed!');
  //   console.log(error);
  // }
};
