import { assign } from '@xstate/immer';
import { createMachine, sendParent } from 'xstate';
import {
  DEFAULT_EVENT_DELIMITER,
  EVENTS,
  THROTTLE_TIME,
} from '~constants';

export type Context = {
  editing?: boolean;
  input?: string;
  name: string;
};

export type Events = { type: 'INPUT'; input?: string };

export const inputMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./input.machine.typegen').Typegen0,
    schema: { context: {} as Context, events: {} as Events },
    initial: 'idle',
    on: {
      INPUT: {
        target: '.idle',
        actions: ['input', 'sendParentInput'],
        internal: false,
      },
    },

    states: {
      idle: {
        after: {
          THROTTLE_TIME: {
            target: 'done',
            cond: 'isEditing',
          },
        },
      },
      done: {
        entry: 'resetEdititng',
        always: {
          actions: ['startQuery'],
          target: 'idle',
        },
      },
    },
  },
  {
    actions: {
      input: assign((context, { input }) => {
        context.input = input;
        context.editing = true;
      }),

      resetEdititng: assign((context) => {
        context.editing = false;
      }),

      sendParentInput: sendParent(({ name }, { input }) => ({
        type: `CHILD${DEFAULT_EVENT_DELIMITER}${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.INPUT}`,
        input,
      })),

      startQuery: sendParent('START_QUERY'),
    },

    guards: {
      isEditing: (context) => !!context.editing,
    },

    delays: { THROTTLE_TIME },
  }
);
