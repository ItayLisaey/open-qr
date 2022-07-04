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

export const machine = createMachine<ContextObject, EventObject>({
  id: 'QR SCAN',
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
          target: 'results',
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
    file: {
      on: {
        SUCCESS: {
          actions: assign({ result: (context, event) => event.value }),
          target: 'results',
        },
        CANCEL: {
          target: 'idle',
        },
      },
    },
  },
});

export const useHomeMachine = () => useMachine(machine);
