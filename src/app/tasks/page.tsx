import TaskItem from '@/src/components/common/taskItem';

import Link from 'next/link';
import TasksList from './components/TasksList';

export default async function page() {
  return (
    <>
      <TasksList />
    </>
  );
}
