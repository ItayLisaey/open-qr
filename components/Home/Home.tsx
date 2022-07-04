import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCamera, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { CameraScan } from '../CameraScan';
import { FileScan } from '../FileScan';
import { Result } from '../Result';
import classes from './home.module.scss';
import { useHomeMachine } from './useHomeMachine';

export interface HomeProps { }

export const Home: React.FC<HomeProps> = () => {
  const [state, send] = useHomeMachine();

  useEffect(() => {
    console.log('state', state);
  }, [state]);

  return (
    <main className={classes.container}>
      {state.matches('idle') && (
        <Idle
          onSelectCamera={() => send('SELECT-CAMERA')}
          onSelectFileUpload={() => send('SELECT-FILE')}
        />
      )}
      {state.matches('camera') && <CameraScan onBack={() => send('CANCEL')} />}
      {state.matches('file') && (
        <FileScan setResult={(result) => send('SUCCESS', { value: result })} onCancel={() => send("CANCEL")} />
      )}
      {state.matches('results') && <Result onBack={() => send('BACK')} data={state.context.result} />}
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
    <section className={classes.idle}>
      <button onClick={onSelectCamera}>
        <FontAwesomeIcon icon={faCamera as IconProp} />
      </button>
      <button onClick={onSelectFileUpload}><FontAwesomeIcon icon={faFileImage as IconProp} size={"5x"} /></button>
    </section>
  );
};
