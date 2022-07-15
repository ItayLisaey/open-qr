import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import classes from './data-line.module.scss';

type DataLineProps = {
  label: string;
  value: string;
  labelProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
  valueProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
};

const DataLine: React.FC<DataLineProps> = ({
  label,
  value,
  labelProps,
  valueProps,
}) => (
  <figure
    className={classes.container}
    datatype={value.length > 15 ? 'longie' : 'shortie'}
  >
    <span role='label' {...labelProps}>
      {label}
    </span>
    <span role='value' {...valueProps}>
      {value}
    </span>
  </figure>
);

type DataLinesValueProps = {
  value: string;
  labelProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
  valueProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
};

export const generateDataLines = (
  data: Record<string, DataLinesValueProps>
) => {
  const lines = Object.entries(data).map(([key, value], index) => (
    <DataLine
      key={index}
      label={key}
      value={value.value}
      labelProps={value.labelProps}
      valueProps={value.valueProps}
    />
  ));

  return <>{lines}</>;
};
