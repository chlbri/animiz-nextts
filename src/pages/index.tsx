import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useMatches, useSend } from 'src/machines/test.machine';

const Home: NextPage = () => {
  const send = useSend();
  const macthes = useMatches({ or: ['fr', 'on'] });
  useEffect(() => {
    console.log(macthes);
  });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <button
          onClick={() => {
            send('CLICK');
          }}
        >
          CLick
        </button>
      </div>
    </div>
  );
};

export default Home;
