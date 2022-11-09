import { NextPage } from 'next';
import { useEffect } from 'react';
import { useMatches, useSend } from '~hooks/machines/test.service';
import { MainLayout } from '~components/shared';

type Props = {};

const useHook = () => {
  const send = useSend();
  const matches = useMatches({ or: ['fr', 'on'] });
  useEffect(() => {
    console.log(matches);
  });

  return { send, matches } as const;
};

export const Home: NextPage = ({}) => {
  const { send } = useHook();
  return (
    <MainLayout title='Home'>
      <div>
        <button
          onClick={() => {
            send('CLICK');
          }}
        >
          CLick
        </button>
      </div>
    </MainLayout>
  );
};
