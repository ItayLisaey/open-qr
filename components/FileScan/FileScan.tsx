import QrScanner from 'qr-scanner';

export interface FileScanProps {
  setResult: (result: string) => void;
}

export const FileScan: React.FC<FileScanProps> = ({ setResult }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      try {
        const result = await QrScanner.scanImage(file);
        setResult(result);
      } catch (e) {
        console.log(e);
      } finally {
        console.log('done');
      }
    }
  };

  return (
    <div>
      <input onChange={handleFileChange} type='file' />
      <button>back</button>
    </div>
  );
};
