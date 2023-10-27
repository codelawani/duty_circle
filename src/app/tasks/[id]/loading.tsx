import React from 'react';

export default function Loading() {
  const tags = Array.from({ length: 3 }, (_, index) => index);
  return (
    <div className='h-44 dark:bg-second-dark  bg-gray-400 p-3 rounded-lg flex flex-col gap-5 md:w-1/2 py-10 '>
      <p className='w-16 animate-pulse h-5 bg-gray-300 rounded-lg dark:bg-[#405B60]'></p>
      <p className='bg-gray-300 h-10 w-full animate-pulse rounded-md dark:bg-[#405B60]'></p>
      <ul className='flex gap-3'>
        {tags.map((tag) => (
          <li
            key={tag}
            className='h-5 rounded-lg w-16 bg-gray-300 animate-pulse dark:bg-[#405B60]'
          ></li>
        ))}
      </ul>
    </div>
  );
}
