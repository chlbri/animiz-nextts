import { nanoid } from 'nanoid';
import type { FC } from 'react';
import { Tag } from '../atoms/Tag';

type Props = {
  tags?: string[];
};

export const Tags: FC<Props> = ({ tags }) => {
  return (
    <div className='flex space-x-2'>
      {/* //TODO: if not enough width show just circle */}
      {tags?.map((tag) => (
        <Tag key={nanoid()}>{tag}</Tag>
      ))}
    </div>
  );
};
