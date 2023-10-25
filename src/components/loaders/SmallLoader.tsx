import { Loader2 } from 'lucide-react';
import { Icons } from '../icons';
export default function SmallLoader({ size = 45 }: { size?: number }) {
  return (
    <div className=' py-4 w-fit mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-10'>
      <Icons.smallLoader size={size} className='animate-spin ' />
    </div>
  );
}
