export default function Loading() {
  const items = Array.from({ length: 10 }, (_, index) => index);
  return (
    <div className='flex flex-col gap-5 animate-pulse my-7'>
      {items.map((item) => (
        <div
          className='h-44 dark:bg-second-dark  bg-gray-400 p-3 rounded-lg flex flex-col gap-5 w-full py-10 '
          key={item}
        >
          <p className='w-16 animate-pulse h-5 bg-gray-300 rounded-lg dark:bg-[#405B60]'></p>
          <p className='bg-gray-300 h-10 w-full animate-pulse rounded-md dark:bg-[#405B60]'></p>
        </div>
      ))}
    </div>
  );
}
