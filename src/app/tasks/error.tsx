'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log('error object', error);
  return (
    <div className=''>
      <h2>An error occurred!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
