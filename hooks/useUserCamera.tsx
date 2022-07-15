import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export const useUserCamera = (props: {
  ref?: MutableRefObject<HTMLVideoElement | null>;
  constraints: MediaStreamConstraints;
}) => {
  const innerRef = useRef<HTMLVideoElement | null>(null);

  const getRef = useCallback(() => {
    if (props.ref === undefined) return innerRef;
    return props.ref;
  }, [props.ref, innerRef]);

  useEffect(() => {
    const theRef = getRef();
    if (theRef.current) {
      try {
        getVideo(theRef.current, props.constraints);
      } catch {
        console.log('Error getting video');
      }
    }
  }, [props.constraints, getRef]);

  const getVideo = async (
    videoElement: HTMLVideoElement,
    constraints: MediaStreamConstraints
  ) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      try {
        videoElement.srcObject = stream;
        videoElement.play();
      } catch (err) {
        console.log('error:', err);
      }
    } catch {
      console.log('heyyy');
    }
  };

  return innerRef;
};
