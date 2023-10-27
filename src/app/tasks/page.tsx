import TasksList from './components/TasksList';
import { QueryClient } from '@tanstack/react-query';
import { getTasks } from '@/src/utils/task/fetch';

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  return (
    <>
      <TasksList />
    </>
  );
}
