import type { FC, ReactNode } from 'react';

type Props = {
  when: boolean;
  fallback?: ReactNode;
  children: ReactNode;
};

export const Show: FC<Props> = ({ children, when, fallback }) => {
  return <>{when ? children : fallback}</>;
};
