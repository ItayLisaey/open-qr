import { useState } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

export interface CameraScanProps {}

export const CameraScan: React.VFC<CameraScanProps> = () => {
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
    <div className='camera-container'>
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
      <button className='camera-flip' onClick={handleFlip}>
        flip
      </button>
    </div>
  );
};
