import ImageN from 'next/image';
import { FC } from 'react';
import { Show } from './Show';

type Props = {
  src?: string;
  className?: string;
  alt: string;
};

export const Image: FC<Props> = ({ src, className, alt }) => {
  return (
    <div className={`relative ${className}`}>
      <Show
        when={!!src}
        fallback={<div className='inset-0 bg-gray-500' />}
      >
        <ImageN
          src={src!}
          alt={alt}
          className='w-9 h-7 rounded border border-yellow-600 bg-white'
        />
      </Show>
    </div>
  );
};
