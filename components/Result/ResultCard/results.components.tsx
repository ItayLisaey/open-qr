import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import classes from './result-card.module.scss';

export const ResultCardHeader: React.FC<{
  title: string;
  icon: IconProp;
}> = ({ title, icon }) => {
  return (
    <>
      <span>{title}</span>
      <FontAwesomeIcon icon={icon} />
    </>
  );
};

type ActionButtonProps = {
  icon: IconProp;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  ...props
}) => {
  return (
    <button {...props} datatype='icon-text'>
      <span>{text}</span>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

const Copy: React.FC<{ result: string }> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopied = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      <ActionButton
        icon={faCopy as IconProp}
        text={'copy'}
        onClick={handleCopied}
      />
      <span className={classes.copied} data-copied={copied}>
        Copied!
      </span>
    </>
  );
};

const Link: React.FC<{ result: string }> = ({ result }) => (
  <a href={result} target='_blank' rel='noreferrer'>
    <ActionButton icon={faLink as IconProp} text={'go to'} />
  </a>
);

export const ResultDisplayActions = {
  Copy,
  Link,
};
