import { Loader, Loader2 } from 'lucide-react';
export default function SmallLoader() {
  return (
    <div className=' py-4 w-fit mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-10'>
      <Loader2 size={45} className='animate-spin ' />
    </div>
  );
}
