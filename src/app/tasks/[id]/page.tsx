import { getDueDate, dateString as getString } from '@/src/utils/task/helpers';
import Image from 'next/image';
import { Icons } from '@/src/components/icons';
import NudgeButton from '@/src/components/homepage/nudge-button';
import BackButton from '../components/back-button';

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
    <main className='md:py-4 md:px-12'>
      <div className='my-4 mb-7'>
        <BackButton />
      </div>
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
      {consequence && (
        <div className='flex flex-col border-y border-body-dark/40 dark:border-text-light my-3 gap-1 py-1 md:w-fit'>
          <span className='capitalize font-medium'>consequence</span>
          <p className='text-red-700 dark:text-red-400'>{consequence}</p>
        </div>
      )}
      {/* <div className='flex gap-3 py-2'>
        <h4>status: </h4>
        <p className=''>{completed ? 'completed' : dueDateDisplay}</p>
      </div> */}

      <p className='py-3'>{dateString}</p>

      <ul className='flex gap-1 items-center'>
        {tags?.map(({ name }) => (
          <li
            key={name}
            className='bg-main-light even:bg-cool-light text-white dark:bg-[#181818] even:dark:bg-[#181818] dark:text-inherit border border-x-cool-light text-accent-foreground px-2 rounded-lg even:border-x-main-light '
          >
            {name}
          </li>
        ))}
      </ul>
      <div className='flex border-y my-5  md:max-w-[50%] border-body-dark/40 dark:border-text-light'>
        <NudgeButton taskId={id} ownerId={ownerId} nudgeCount={nudgeCount} />
        {/* <Button variant={'ghost'}>
          <MessageSquare />
        </Button> */}
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
