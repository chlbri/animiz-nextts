import { FC, ReactNode } from 'react';
import { useTooltip } from '~hooks';
import { Tooltip, TootltipProps } from './Tooltip';

type Props = {
  children: ReactNode;
  title?: string;
  summary: string;
};

export const WithTooltip: FC<Props> = ({ children, title, summary }) => {
  // #region Preparation
  let ref: any = null;

  const { mouseEvents, tooltipProps: props } = useTooltip({
    timeToShow: 600,
  });

  const tooltipProps: TootltipProps = {
    title,
    summary,
    ...props,
  };
  // #endregion

  return (
    <div
      ref={ref}
      className='relative w-max flex cursor-pointer hover:cursor-help transition duration-500'
      {...mouseEvents}
    >
      {children}
      <Tooltip {...tooltipProps} />
    </div>
  );
};
