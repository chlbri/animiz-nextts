import { FC, useEffect } from 'react';
import { onClick, start, useSelector } from '~hooks/test/testMachine';

type Props = {};

const Page: FC<Props> = () => {
  const value = useSelector(({ value }) => value);
  useEffect(() => {
    start();
  }, []);
  return (
    <div className='flex space-x-6 text-2xl font-bold'>
      <span>{JSON.stringify(value)}</span>
      <button
        onClick={onClick}
        className='text-base px-3 py-1.5 border border-gray-600 rounded-lg'
      >
        Type to send
      </button>
    </div>
  );
};

export default Page;
