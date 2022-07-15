import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const Default: React.FC<{ result: string }> = ({ result }) => {
  return (
    <div className={classes.default}>
      <span>value</span>
      <span>{result}</span>
    </div>
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

const DefaultAction: React.FC<{ result: string }> = ({ result }) => {
  return <ActionButton icon={faCopy as IconProp} text={'copy'} />;
};

export const ResultDisplayElements = {
  Default,
};

export const ResultDisplayActions = {
  DefaultAction,
};
