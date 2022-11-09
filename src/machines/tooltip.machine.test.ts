import { interpret } from 'xstate';
import { advanceByTime } from '~utils';
import { DEFAULT_TIME_TO_SHOW, tooltipMachine } from './tooltip.machine';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

test('should first', async () => {
  const service = interpret(tooltipMachine).start();
  const position = () => service.getSnapshot().context.position;
  service.send('MOUSE_ENTER');
  service.send({ type: 'MOUSE_MOVE', position: { x: 23, y: 34 } });
  await advanceByTime(DEFAULT_TIME_TO_SHOW + 1);
  const matches = service.getSnapshot().matches;
  expect(matches('enter.show')).toBe(true);
  expect(position()).toBeUndefined();
  service.send({
    type: 'GET_COORDS',
    coords: { height: 1, width: 1, left: 1, top: 1 },
  });

  service.send({ type: 'GET_TOOLTIP', size: { height: 1, width: 1 } });
  service.send({ type: 'GET_VIEWPORT', size: { height: 1, width: 1 } });
  service.send({ type: 'MOUSE_MOVE', position: { x: 23, y: 34 } });

  const context = service.getSnapshot().context;
  await advanceByTime(1);
  expect(position()).toBeDefined();
});
