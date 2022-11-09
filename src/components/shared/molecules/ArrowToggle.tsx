import { FC } from 'react';
import { ArrowDownIcon } from '../atoms/icons/ArrowDown';
import { ArrowUpIcon } from '../atoms/icons/ArrowUp';

type Props = {
  open: boolean;
};

export const ArrowToggle: FC<Props> = ({ open }) => {
  return (
    <span className='relative w-7 h-7'>
      <div
        className={`absolute inset-0 ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'opacity-0 pointer-events-none'
        } transition-opacity ease-linear duration-300`}
      >
        <ArrowDownIcon className='h-full w-full' />
      </div>
      <div
        className={`absolute inset-0 ${
          !open
            ? 'pointer-events-auto opacity-100'
            : 'opacity-0 pointer-events-none'
        } transition-opacity ease-linear duration-300 `}
      >
        <ArrowUpIcon className='h-full w-full' />
      </div>
    </span>
  );
};
