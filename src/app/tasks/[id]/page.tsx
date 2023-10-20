import axios from 'axios';

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

  const { title, description, status, dueDate } = await taskData;
  const date = new Date(dueDate);
  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return (
    <main className='px-5 py-5 md:w-1/2 md:mx-auto  flex flex-col gap-5'>
      <Card heading='name' content={title} />
      <Card heading='description' content={description} />
      <Card heading='due date' content={dateString} />
      <Card heading='status' content={status.toLowerCase()} />
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
