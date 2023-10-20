import NewTaskForm from './components/NewTaskForm';

export default function page() {
  return (
    <main className='px-5 py-5'>
      <h2 className='capitalize font-bold tracking-wider leading-8 text-center'>
        create task
      </h2>
      <NewTaskForm />
    </main>
  );
}
