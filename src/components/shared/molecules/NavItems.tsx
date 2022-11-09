import { nanoid } from 'nanoid';
import { FC } from 'react';
import { NavLink } from '../atoms/NavLink';
import { For } from './For';

const LIST = ['Home', 'Profile', 'Animes', 'Mangas'];

type Props = {};

export const NavItems: FC<Props> = ({}) => {
  return (
    <nav className='flex space-x-12 font-family-overpass items-center text-sm'>
      <For list={LIST}>
        {(item) => (
          <NavLink key={nanoid()} href='#'>
            {item}
          </NavLink>
        )}
      </For>
    </nav>
  );
};
