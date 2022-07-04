import React from 'react';

export interface ResultProps {
  onBack: VoidFunction;
}

export const Result: React.VFC<ResultProps> = ({ onBack }) => {
  return (
    <div>
      <h1>results</h1>
      <button onClick={onBack}>back</button>
    </div>
  );
};
