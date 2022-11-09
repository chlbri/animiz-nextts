import { FC } from 'react';
import { SearchIcon } from '../atoms/icons/Search';
import { Avatar } from '../molecules/Avatar';
import { NavItems } from '../molecules/NavItems';

type Props = {};

export const NavHeader: FC<Props> = ({}) => {
  return (
    <header className='w-full h-14 bg-blue_black flex items-center px-10 text-gray-400 justify-center'>
      <div className='flex w-full justify-between max-w-7xl'>
        <span className='text-4xl'>LOGO</span>
        <NavItems />
        <div className='space-x-5 flex items-center'>
          <button>
            <SearchIcon className='w-5 h-5' />
          </button>
          <Avatar />
        </div>
      </div>
    </header>
  );
};
