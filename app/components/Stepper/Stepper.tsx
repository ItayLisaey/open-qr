import { useStepperMachine } from './useStepperMachine';

export interface StepperProps {}

export const Stepper: React.VFC<StepperProps> = () => {
  const [state, send] = useStepperMachine();

  if (state.value === 'typeof_code') {
    return (
      <div>
        <h1>Choose type of code</h1>
        <button onClick={() => send('CHOOSE', { value: 'code' })}>Code</button>
        <button onClick={() => send('CHOOSE', { value: 'barcode' })}>
          Barcode
        </button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    );
  }

  if (state.value === 'typeof_upload') {
    return (
      <div>
        <h1>Choose type of upload</h1>
        <p>{state.context.code}</p>
        <button onClick={() => send('CHOOSE_IMAGE')}>Image</button>
        <button onClick={() => send('CHOOSE_FILE')}>File</button>
        <button onClick={() => send('BACK')}>Back</button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    );
  }

  if (state.value === 'processing') {
    return (
      <div>
        <p>{state.context.code}</p>

        <p>{state.context.upload}</p>
        <h1>Processing...</h1>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    );
  }

  if (state.value === 'results') {
    return (
      <div>
        <h1>Result</h1>
        <p>{state.context.code}</p>+<p>{state.context.upload}</p>
        <button onClick={() => send('BACK')}>Back</button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    );
  }

  return <>{state.value}</>;
};
