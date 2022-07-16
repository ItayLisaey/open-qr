import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCamera,
  faExclamationTriangle,
  faFileImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';
import { AnimationPresets } from '../../styles/animation.config';
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
      <motion.button onClick={onSelectCamera} {...AnimationPresets.standard}>
        <FontAwesomeIcon icon={faCamera as IconProp} />
      </motion.button>
      <motion.button
        onClick={onSelectFileUpload}
        {...AnimationPresets.standard}
      >
        <FontAwesomeIcon icon={faFileImage as IconProp} />
      </motion.button>

      {error && (
        <section>
          <FontAwesomeIcon icon={faExclamationTriangle as IconProp} />
          <p>{error}</p>
        </section>
      )}
    </section>
  );
};
