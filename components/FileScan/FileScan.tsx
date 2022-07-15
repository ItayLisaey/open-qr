import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QrScanner from 'qr-scanner';
import classes from './file-scan.module.scss';
export interface FileScanProps {
  setResult: (result: string) => void;
  onCancel: () => void;
}

export const FileScan: React.FC<FileScanProps> = ({ setResult, onCancel }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      try {
        const result = await QrScanner.scanImage(file, {
          returnDetailedScanResult: true,
        });
        setResult(result);
      } catch (e) {
        console.log(e);
      } finally {
        console.log('done');
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
