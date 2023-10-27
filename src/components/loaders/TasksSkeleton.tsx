import React from 'react';

export default function TasksSkeleton() {
  const items = Array.from({ length: 15 }, (_, index) => index);
  const tags = Array.from({ length: 3 }, (_, index) => index);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-pulse my-7'>
      {items.map((item) => (
        <div
          key={item}
          className='min-h-[12rem] dark:bg-second-dark  bg-gray-400 p-3 rounded-lg flex flex-col gap-5 w-full relative pt-9 pl-7'
        >
          <span className='bg-gray-300 h-4/5 w-1 animate-pulse rounded-md dark:bg-[#405B60]  absolute top-1/2 -translate-y-1/2  left-2'></span>
          <div className='flex items-center gap-2'>
            <p className='bg-gray-300 h-7 w-7 animate-pulse rounded-md dark:bg-[#405B60]'></p>
            <p className='bg-gray-300 h-12 w-full animate-pulse rounded-md dark:bg-[#405B60]'></p>
          </div>
          <ul className='flex gap-3'>
            {tags.map((tag) => (
              <li
                key={tag}
                className='h-5 rounded-lg w-16 bg-gray-300 animate-pulse dark:bg-[#405B60]'
              ></li>
            ))}
          </ul>
          <div className='flex items-center gap-4 justify-between mt-auto'>
            <p className='w-16 animate-pulse h-5 bg-gray-300 rounded-lg dark:bg-[#405B60]'></p>
            <p className='w-8 animate-pulse h-5 bg-gray-300 rounded-lg dark:bg-[#405B60]'></p>
          </div>
        </div>
      ))}
    </div>
  );
}
