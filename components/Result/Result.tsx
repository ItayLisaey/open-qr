import { motion } from 'framer-motion';
import React from 'react';
import { AnimationPresets } from '../../styles/animation.config';
import classes from './result.module.scss';
import { ResultCard } from './ResultCard';

export interface ResultProps {
  onBack: VoidFunction;
  data?: string;
}

export const Result: React.FC<ResultProps> = ({ onBack, data }) => {
  return (
    <section className={classes.container}>
      <motion.main {...AnimationPresets.standard}>
        <ResultCard data={data} />
      </motion.main>
      <motion.footer {...AnimationPresets.standard}>
        <button onClick={onBack}>back</button>
      </motion.footer>
    </section>
  );
};
