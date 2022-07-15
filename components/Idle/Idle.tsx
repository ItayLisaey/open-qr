import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCamera,
  faExclamationTriangle,
  faFileImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './idle.module.scss';

interface IdleProps {
  onSelectCamera: () => void;
  onSelectFileUpload: () => void;
  error: string | undefined;
}

export const Idle: React.FC<IdleProps> = ({
  onSelectCamera,
  onSelectFileUpload,
  error,
}) => {
  return (
    <section className={classes.container}>
      <button onClick={onSelectCamera}>
        <FontAwesomeIcon icon={faCamera as IconProp} />
      </button>
      <button onClick={onSelectFileUpload}>
        <FontAwesomeIcon icon={faFileImage as IconProp} />
      </button>
      {error && (
        <section>
          <FontAwesomeIcon icon={faExclamationTriangle as IconProp} />
          <p>{error}</p>
        </section>
      )}
    </section>
  );
};
