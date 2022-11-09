import type { FC } from 'react';
import { CommentIcon, LikeIcon, Show, VueIcon } from '~components/shared';

type Props = {
  vues?: string;
  likes?: string;
  comments?: string;
};

export const Relateds: FC<Props> = ({ vues, likes, comments }) => {
  return (
    <span className='flex space-x-3 items-center'>
      <Show when={!!vues}>
        <span className='flex space-x-1 items-center'>
          <VueIcon className='w-4 h-4' />
          <span>{vues}</span>
        </span>
      </Show>
      <Show when={!!comments}>
        <span className='flex space-x-1 items-center'>
          <CommentIcon className='w-4 h-4' />
          <span>{comments}</span>
        </span>
      </Show>
      <Show when={!!likes}>
        <span className='flex space-x-1 items-center'>
          <LikeIcon className='w-4 h-4' />
          <span>{likes}</span>
        </span>
      </Show>
    </span>
  );
};
