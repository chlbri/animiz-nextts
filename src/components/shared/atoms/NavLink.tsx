import Link from 'next/link';
import { FC } from 'react';

type Props = {
  children: string;
  href: string;
  className?: string;
};

export const NavLink: FC<Props> = (props) => {
  return <Link {...props} />;
};
