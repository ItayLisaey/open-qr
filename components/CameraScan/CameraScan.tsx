import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faRepeat, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';
import classes from './camera-scan.module.scss';


export interface CameraScanProps {
  onBack: VoidFunction;
}

export const CameraScan: React.VFC<CameraScanProps> = ({ onBack }) => {
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>(
    'environment'
  );

  const handleFlip = () =>
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));

  const handleResult: OnResultFunction = (result, error) => {
    if (result) {
      window.location.href = `/results/${result.getText()}`;
    }
    console.log(result);
  };

  return (
    <div className={classes.container}>
      <QrReader
        className='camera-section'
        onResult={handleResult}
        videoContainerStyle={{
          paddingTop: '0',
          width: '100%',
          height: '100vh',
        }}
        videoStyle={{
          display: 'flex',
          overflow: 'auto',
          position: 'auto',
          width: '100%',
          height: '100vh',
        }}
        constraints={{
          facingMode: facingMode,
        }}
      />
      <button role="flip-camera" onClick={handleFlip}>
        <FontAwesomeIcon icon={faRepeat as IconProp} />
      </button>
      <button role="back" onClick={onBack}>
        <FontAwesomeIcon icon={faTimes as IconProp} />
      </button>
    </div>
  );
};
