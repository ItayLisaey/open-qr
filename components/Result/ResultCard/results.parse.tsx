import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faEnvelope,
  faFont,
  faHashtag,
  faLink,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import invariant from 'tiny-invariant';
import { generateDataLines } from '../../DataLine';

import { ResultCardHeader, ResultDisplayActions } from './results.components';

type ResultType = 'url' | 'email' | 'number' | 'date' | 'time' | 'phone';

type ResultDisplay = {
  header: JSX.Element;
  action: (result: string) => JSX.Element;
  element: (result: string) => JSX.Element;
};

type ResultObject = {
  display: ResultDisplay;
  value: string;
};

const translator: Record<ResultType, RegExp> = {
  url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/,
  email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
  number: /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/,
  date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
  time: /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/,
  phone:
    /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/,
};

export const assertResult = (result: string): ResultType | undefined => {
  Object.entries(translator).forEach(([key, value]) => {
    if (value.test(result)) {
      return key;
    }
  });
  return undefined;
};

const resultsDisplay: Record<ResultType, ResultDisplay> = {
  url: {
    header: <ResultCardHeader title={'Link'} icon={faLink as IconProp} />,
    action: (result: string) => <ResultDisplayActions.Copy result={result} />,
    element: (result: string) =>
      generateDataLines({ value: { value: result } }),
  },
  date: {
    header: <ResultCardHeader title={'Date'} icon={faCalendar as IconProp} />,
    action: (result: string) => <ResultDisplayActions.Copy result={result} />,
    element: (result: string) =>
      generateDataLines({ value: { value: result } }),
  },
  time: {
    header: <ResultCardHeader title={'Time'} icon={faCalendar as IconProp} />,
    action: (result: string) => <ResultDisplayActions.Copy result={result} />,
    element: (result: string) =>
      generateDataLines({ value: { value: result } }),
  },
  email: {
    header: <ResultCardHeader title={'Email'} icon={faEnvelope as IconProp} />,
    action: (result: string) => <ResultDisplayActions.Copy result={result} />,
    element: (result: string) =>
      generateDataLines({ value: { value: result } }),
  },
  number: {
    header: <ResultCardHeader title={'Number'} icon={faHashtag as IconProp} />,
    action: (result: string) => <ResultDisplayActions.Copy result={result} />,
    element: (result: string) =>
      generateDataLines({ value: { value: result } }),
  },
  phone: {
    header: <ResultCardHeader title={'Phone'} icon={faPhone as IconProp} />,
    action: (result: string) => <ResultDisplayActions.Copy result={result} />,
    element: (result: string) =>
      generateDataLines({ value: { value: result } }),
  },
};

export const getResultObject = (
  result: string | undefined
): ResultObject | undefined => {
  try {
    invariant(result, 'Result is undefined');
    const type = assertResult(result);
    invariant(type, 'Result is not a valid type');
    const display = resultsDisplay[type];
    return {
      display,
      value: result,
    };
  } catch {
    return {
      display: {
        header: <ResultCardHeader title={'Text'} icon={faFont as IconProp} />,
        action: (result: string) => (
          <ResultDisplayActions.Copy result={result} />
        ),
        element: (result: string) =>
          generateDataLines({ value: { value: result } }),
      },
      value: result ?? '',
    };
  }
};
