import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QrScanner from 'qr-scanner';
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
        console.log(e);
        if (e === QrScanner.NO_QR_CODE_FOUND) {
          return onError('No QR code found');
        }
        return onError('Error scanning file, please try again.');
      }
    }
  };

  return (
    <section className={classes.container}>
      <label datatype='file-icon'>
        <FontAwesomeIcon icon={faUpload as IconProp} />
        <input hidden onChange={handleFileChange} type='file' />
      </label>
      <button onClick={onCancel} datatype='back-icon'>
        <FontAwesomeIcon icon={faTimes as IconProp} />
      </button>
    </section>
  );
};
