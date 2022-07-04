import React, { useEffect } from 'react';
import { CameraScan } from '../CameraScan';
import { FileScan } from '../FileScan';
import { Result } from '../Result';
import styles from './home.module.scss';
import { useHomeMachine } from './useHomeMachine';

export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [state, send] = useHomeMachine();

  useEffect(() => {
    console.log('state', state);
  }, [state]);

  return (
    <main className={styles.container}>
      <pre>{JSON.stringify(state.context, null, 2)}</pre>
      {state.matches('idle') && (
        <Idle
          onSelectCamera={() => send('SELECT-CAMERA')}
          onSelectFileUpload={() => send('SELECT-FILE')}
        />
      )}
      {state.matches('camera') && <CameraScan />}
      {state.matches('file') && (
        <FileScan setResult={(result) => send('SUCCESS', { value: result })} />
      )}
      {state.matches('results') && <Result onBack={() => send('BACK')} />}
    </main>
  );
};

interface IdleProps {
  onSelectCamera: () => void;
  onSelectFileUpload: () => void;
}

export const Idle: React.FC<IdleProps> = ({
  onSelectCamera,
  onSelectFileUpload,
}) => {
  return (
    <>
      <button onClick={onSelectCamera}>image</button>
      <button onClick={onSelectFileUpload}>file</button>
    </>
  );
};
