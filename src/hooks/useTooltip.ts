import { useInterpret, useSelector } from '@xstate/react';
import { MouseEvent, useEffect, useRef } from 'react';
import { tooltipMachine } from '~machines';
import type {
  Context,
  Coords,
  Position,
  Size,
} from '~machines/tooltip.types';

export function useTooltip(
  context?: Pick<Context, 'timeToHide' | 'timeToShow'>
) {
  const ref = useRef<HTMLElement>();
  const machine = context
    ? tooltipMachine.withContext(context)
    : tooltipMachine;

  const service = useInterpret(machine);
  const [position, show] = useSelector(service, (state) => {
    return [state.context.position, state.matches('enter.show')] as const;
  });

  useEffect(() => {
    const size: Size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    service.send({ type: 'GET_VIEWPORT', size });
    const current = ref.current;

    if (current) {
      const coords: Coords = {
        left: current.clientLeft,
        top: current.clientTop,
        width: current.clientWidth,
        height: current.clientHeight,
      };
      service.send({ type: 'GET_COORDS', coords });
    }
  });

  const mouseEvents = {
    onMouseEnter: () => service.send('MOUSE_ENTER'),
    onMouseLeave: () => service.send('MOUSE_LEAVE'),

    onMouseMove: <T>(event: MouseEvent<T>) => {
      const position: Position = {
        x: event.clientX,
        y: event.clientY,
      };
      service.send({ type: 'MOUSE_MOVE', position });
    },
  };

  const tooltipProps = {
    show,
    getSize: (size: Size) => service.send({ type: 'GET_TOOLTIP', size }),
    position,
  };

  return { mouseEvents, tooltipProps } as const;
}
