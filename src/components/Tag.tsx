import clsx from 'clsx';

import classes from './Tag.module.scss';

type TagProps = {
  projectName: string;
  label: string;
  date: string;
};

const getFormattedDate = (date: string) => new Date(date).toLocaleDateString();

const Tag = ({ projectName, label, date }: TagProps) => {
  return (
    <div className={clsx(classes.tag, classes[projectName])}>
      <span className={classes.label}>{label}</span>
      <span className={classes.date}>{getFormattedDate(date)}</span>
    </div>
  );
};

export default Tag;
