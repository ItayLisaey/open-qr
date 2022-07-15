import React from 'react';
import classes from './result-card.module.scss';
import { getResultObject } from './results.parse';

export interface ResultCardProps {
  data?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const result = getResultObject(data);

  if (!result) return <>Undefined</>;

  return (
    <div className={classes.container}>
      <header>{result.display.header}</header>
      <main>{result.display.element(result.value)}</main>
      <footer>{result.display.action(result.value)}</footer>
    </div>
  );
};
