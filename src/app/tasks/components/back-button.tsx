'use client';
import { Icons } from '@/src/components/icons';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <Button
      variant={'ghost'}
      className='flex items-center text-lg capitalize pl-0 ml-0'
      onClick={goBack}
    >
      <Icons.leftArrow size={30} />
      go back
    </Button>
  );
}
