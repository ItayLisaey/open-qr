import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';

type ctx = {
  code: string | undefined;
  upload: string | undefined;
  error: string | undefined;
};

type eObj = {
  type: string;
  value: string;
};

const chooseCodeType = assign<ctx, { type: string; value: string }>({
  code: (_, event) => {
    return event.value;
  },
});

const process = async () => {
  return await new Promise((resolve) => setTimeout(resolve, 2000));
};

const machine = createMachine<ctx, eObj>(
  {
    id: 'Process Barcode',
    initial: 'typeof_code',
    context: {
      code: undefined,
      error: undefined,
      upload: undefined,
    },
    states: {
      typeof_code: {
        on: {
          CHOOSE: {
            actions: chooseCodeType,
            target: 'typeof_upload',
          },
        },
      },
      typeof_upload: {
        on: {
          CHOOSE_IMAGE: {
            actions: assign({ upload: (_) => 'image' }),
            target: 'processing',
          },
          CHOOSE_FILE: {
            actions: assign({ upload: (_) => 'file' }),
            target: 'processing',
          },
          BACK: {
            target: 'typeof_code',
          },
        },
      },
      processing: {
        invoke: {
          src: process,
          onDone: [
            {
              target: 'results',
            },
          ],
          onError: [
            {
              target: 'typeof_upload',
            },
          ],
        },
      },
      results: {
        on: {
          BACK: {
            target: 'typeof_code',
          },
        },
      },
    },
  },
  {
    actions: {
      chooseCodeType,
    },
  }
);

export const useStepperMachine = () => useMachine(machine);
