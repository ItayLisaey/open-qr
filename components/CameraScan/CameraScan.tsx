import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faRepeat, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useUserCamera } from '../../hooks/useUserCamera';
import { useVideoScanner } from '../../hooks/useVideoScanner';
import classes from './camera-scan.module.scss';

export interface CameraScanProps {
  onBack: VoidFunction;
  onSuccess: (result: string) => void;
}

export const CameraScan: React.VFC<CameraScanProps> = ({
  onBack,
  onSuccess,
}) => {
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>(
    'environment'
  );
  const handleResult = (result: string) => onSuccess(result);

  const videoRef = useUserCamera({
    constraints: {
      video: {
        width: { ideal: 1280 },
        latency: { ideal: 0 },
        frameRate: { ideal: 30 },
        aspectRatio: { exact: 1 },
        facingMode: facingMode,
      },
    },
  });
  useVideoScanner(videoRef, handleResult);

  const handleFlip = () =>
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));

  return (
    <div className={classes.container}>
      <video ref={videoRef} />
      <button role='flip-camera' onClick={handleFlip}>
        <FontAwesomeIcon icon={faRepeat as IconProp} />
      </button>
      <button role='back' onClick={onBack}>
        <FontAwesomeIcon icon={faTimes as IconProp} />
      </button>
    </div>
  );
};
