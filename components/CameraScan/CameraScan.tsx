import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import QrScanner from 'qr-scanner';
import { useRef } from 'react';
import { useVideoScanner } from '../../hooks/useVideoScanner';
import { AnimationPresets } from '../../styles/animation.config';
import classes from './camera-scan.module.scss';

export interface CameraScanProps {
  onBack: VoidFunction;
  setResult: (result: string) => void;
  onError: (error: string) => void;
}

export const CameraScan: React.FC<CameraScanProps> = ({
  onBack,
  setResult,
  onError,
}) => {
  const onDecode = (result: string) => {
    console.log('result', result);
    return setResult(result);
  };

  const onDecodeError = (error: string | Error) => {
    const err = error.toString();

    if (err === QrScanner.NO_QR_CODE_FOUND) return;

    onError(error.toString());
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useVideoScanner(videoRef, onDecode, onDecodeError);

  return (
    <div className={classes.container}>
      <h1>Searching...</h1>
      <video ref={videoRef} />
      <section role='button-container'>
        <motion.button
          role='back'
          onClick={onBack}
          {...AnimationPresets.standard}
        >
          <FontAwesomeIcon icon={faTimes as IconProp} />
        </motion.button>
      </section>
    </div>
  );
};
