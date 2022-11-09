import { FC, useState } from 'react';
import { Image } from '../atoms/Image';
import { ArrowToggle } from './ArrowToggle';

type Props = {
  src?: string;
};

export const Avatar: FC<Props> = ({ src }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      className='flex items-center space-x-2 text-xs'
      onClick={() => {
        setOpen((open) => !open);
      }}
    >
      <Image
        src={src}
        alt='Avatar'
        className='w-9 h-7 rounded border border-yellow-600 bg-white'
      />
      <ArrowToggle open={open} />
    </button>
  );
};
