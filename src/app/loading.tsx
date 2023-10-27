export default function Loading() {
  const items = Array.from({ length: 15 }, (_, index) => index);
  const tags = Array.from({ length: 3 }, (_, index) => index);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-pulse my-7'>
      {items.map((item) => (
        <div
          key={item}
          className='min-h-[12rem] dark:bg-second-dark  bg-gray-400 p-3 rounded-lg flex flex-col gap-5 w-full '
        >
          <div className='flex items-center gap-1'>
            <p className='w-9 animate-pulse h-9 bg-gray-300 rounded-full dark:bg-[#405B60]'></p>
            <p className='w-20 animate-pulse h-4 bg-gray-300 rounded-lg dark:bg-[#405B60]'></p>
          </div>
          <p className='bg-gray-300 h-12 w-full animate-pulse rounded-md dark:bg-[#405B60]'></p>
          <ul className='flex gap-3'>
            {tags.map((tag) => (
              <li
                key={tag}
                className='h-5 rounded-lg w-16 bg-gray-300 animate-pulse dark:bg-[#405B60]'
              ></li>
            ))}
          </ul>
          <div className='flex items-center gap-4 justify-end'>
            <p className='w-8 animate-pulse h-5 bg-gray-300 rounded-md dark:bg-[#405B60]'></p>
            <p className='w-8 animate-pulse h-5 bg-gray-300 rounded-lg dark:bg-[#405B60]'></p>
          </div>
        </div>
      ))}
    </div>
  );
}
