import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import QrScanner from 'qr-scanner';
import { AnimationPresets } from '../../styles/animation.config';
import classes from './file-scan.module.scss';
export interface FileScanProps {
  setResult: (result: string) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

export const FileScan: React.FC<FileScanProps> = ({
  setResult,
  onCancel,
  onError,
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      try {
        const result = await QrScanner.scanImage(file);
        setResult(result);
      } catch (e) {
        if (e === QrScanner.NO_QR_CODE_FOUND) {
          return onError('No QR code found');
        }
        return onError('No QR code found, please try again.');
      }
    }
  };

  return (
    <section className={classes.container}>
      <motion.label datatype='file-icon' {...AnimationPresets.standard}>
        <FontAwesomeIcon icon={faUpload as IconProp} />
        <input hidden onChange={handleFileChange} type='file' />
      </motion.label>
      <motion.button
        onClick={onCancel}
        datatype='back-icon'
        {...AnimationPresets.standard}
      >
        <FontAwesomeIcon icon={faTimes as IconProp} />
      </motion.button>
    </section>
  );
};
