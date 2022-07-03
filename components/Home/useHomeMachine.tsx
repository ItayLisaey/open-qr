import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

export const machine = createMachine({
  id: 'QR SCAN',
  initial: 'idle',
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
