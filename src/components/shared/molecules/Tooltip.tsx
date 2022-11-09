import { FC, useLayoutEffect, useRef } from 'react';
import type { Size } from '~machines/tooltip.types';
import { Show } from '../atoms';

export type TootltipProps = {
  title?: string;
  summary: string;
  getSize: (size: Size) => void;
  position?: string;
  show: boolean;
};

function useHook(getSize: (size: Size) => void) {
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const current = ref.current;
    if (!current) return;
    const size: Size = {
      width: current.clientWidth,
      height: current.clientHeight,
    };
    getSize(size);
  });
  return ref;
}

export const Tooltip: FC<TootltipProps> = ({
  title,
  summary,
  position: transform,
  getSize,
  show,
}) => {
  const ref = useHook(getSize);

  return (
    <div
      ref={ref as any}
      className={`absolute flex flex-col w-max space-y-2 ${
        show
          ? 'pointer-events-auto opacity-100'
          : 'opacity-0 pointer-events-none'
      } transition transform duration-500 ease-in-out text-white z-30 border rounded-xl border-gray-500`}
      style={{
        transform,
      }}
    >
      <Show when={!!title} fallback={<span className='h-5' />}>
        <h4 className='font-medium p-1'>{title}</h4>
      </Show>
      <span className='w-full bg-gray-400 h-0.5' />
      <span className='text-xs py-1 px-3 text-gray-300'>{summary}</span>
    </div>
  );
};
