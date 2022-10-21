import createMachineContext from 'src/utils/createFastContext';
import { createMachine } from 'xstate';
export const testmachine = createMachine({
  predictableActionArguments: true,
  initial: 'off',
  tsTypes: {} as import('./test.machine.typegen').Typegen0,
  context: { inc: 10 },
  states: {
    on: { on: { CLICK: 'off' }, after: { 1000: 'off' } },
    off: { on: { CLICK: 'on' }, after: { 1000: 'fr' } },
    fr: {
      after: {
        1000: 'on',
      },
    },
  },
});

export const { Provider, useSend, useMatches, useState, useContext } =
  createMachineContext(testmachine);
