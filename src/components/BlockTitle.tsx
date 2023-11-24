import clsx from 'clsx';

import classes from './BlockTitle.module.scss';

const BlockTitle = ({ title, view }) => {
  return <h3 className={clsx(classes.blockTitle, classes[view])}>{title}</h3>;
};

export default BlockTitle;
