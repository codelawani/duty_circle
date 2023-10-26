import NotificationList from './components/notification-list';

export default async function page() {
  return (
    <>
      <h2 className='text-center font-bold capitalize text-lg pb-4 '>
        notifications
      </h2>
      <NotificationList />
    </>
  );
}
