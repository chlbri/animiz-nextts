import type { FC } from 'react';

type Props = { children: string };

export const Tag: FC<Props> = (props) => <h6 {...props} />;
