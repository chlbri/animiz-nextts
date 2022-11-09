import { FC } from 'react';

type Props = {};

export const MainFooter: FC<Props> = ({}) => {
  return (
    <footer className='bg-black py-8 text-center text-white mt-20'>
      <div className='max-w-7xl mx-auto'>
        Copyright beme.dev &copy; 2022. All rights reserved.
      </div>
    </footer>
  );
};
