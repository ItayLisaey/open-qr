import QrScanner from 'qr-scanner';
import { MutableRefObject, useEffect } from 'react';

export const useVideoScanner = (
  ref: MutableRefObject<HTMLVideoElement | null>,
  handler: (result: string) => void
) => {
  useEffect(() => {
    if (ref.current) {
      const scanner = new QrScanner(ref.current, handler);
      scanner.start();
      return () => scanner.destroy();
    }
  }, [handler, ref]);
};
