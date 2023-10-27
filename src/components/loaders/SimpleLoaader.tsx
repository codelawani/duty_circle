import { cn } from '@/src/lib/utils';
import { Icons } from '../icons';

type Props = {
  styles?: string;
};

export default function SimpleLoaader(props: Props) {
  const { styles = '' } = props;

  return <Icons.loader className={cn('animate-spin ', styles)} size={'100'} />;
}
