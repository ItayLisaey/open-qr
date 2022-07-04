import React from 'react';
import classes from './result.module.scss';
import { ResultCard } from './ResultCard';

export interface ResultProps {
  onBack: VoidFunction;
  data?: string;
}

export const Result: React.VFC<ResultProps> = ({ onBack, data }) => {
  return (
    <section className={classes.container}>
      <main>
        <ResultCard data={data} />
      </main>
      <footer>
        <button onClick={onBack}>back</button>
      </footer>
    </section>
  );
};
