import React from 'react';
import { CameraScan } from '../CameraScan';
import { FileScan } from '../FileScan';
import { Idle } from '../Idle';
import { Result } from '../Result';
import classes from './home.module.scss';
import { useHomeMachine } from './useHomeMachine';

export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [state, send] = useHomeMachine();

  const options: Record<string, JSX.Element> = {
    idle: (
      <Idle
        onSelectCamera={() => send('SELECT-CAMERA')}
        onSelectFileUpload={() => send('SELECT-FILE')}
        error={state.context.error}
      />
    ),
    camera: (
      <CameraScan
        onBack={() => send('CANCEL')}
        onError={(error) => send('ERROR', { value: error })}
        setResult={(result) => send('SUCCESS', { value: result })}
      />
    ),
    file: (
      <FileScan
        setResult={(result) => send('SUCCESS', { value: result })}
        onError={(error) => send('ERROR', { value: error })}
        onCancel={() => send('CANCEL')}
      />
    ),
    result: <Result onBack={() => send('BACK')} data={state.context.result} />,
  };

  return (
    <main className={classes.container}>
      {options[state.value as keyof typeof options]}
    </main>
  );
};
