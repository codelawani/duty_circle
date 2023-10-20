import { Loader, LucideProps } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type Props = {
  styles?: string;
};

export default function SimpleLoaader(props: Props) {
  const { styles = '' } = props;

  return <Loader className={cn('animate-spin ', styles)} size={'100'} />;
}
