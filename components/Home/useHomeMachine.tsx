import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';

type ContextObject = {
  result?: string;
  error?: string;
};

type EventObject = {
  type: string;
  value: string;
};

export const machine = createMachine<ContextObject, EventObject>(
  {
    id: 'qr-scan',
    initial: 'idle',
    schema: {
      context: {} as ContextObject,
    },
    context: {
      result: undefined,
      error: undefined,
    },
    states: {
      idle: {
        entry: 'clear',
        exit: 'clearError',
        on: {
          'SELECT-CAMERA': {
            target: 'camera',
          },
          'SELECT-FILE': {
            target: 'file',
          },
        },
      },
      camera: {
        on: {
          SUCCESS: {
            actions: assign({ result: (context, event) => event.value }),
            target: 'results',
          },
          ERROR: {
            actions: assign({ error: (context, event) => event.value }),
            target: 'idle',
          },
          CANCEL: {
            target: 'idle',
          },
        },
      },
      file: {
        on: {
          SUCCESS: {
            actions: assign({ result: (context, event) => event.value }),
            target: 'results',
          },
          ERROR: {
            actions: assign({ error: (context, event) => event.value }),
            target: 'idle',
          },
          CANCEL: {
            target: 'idle',
          },
        },
      },

      results: {
        on: {
          BACK: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    actions: {
      clear: assign({
        result: (context, event) => undefined,
      }),
      clearError: assign({
        error: (context, event) => undefined,
      }),
    },
  }
);

export const useHomeMachine = () => useMachine<typeof machine>(machine);
