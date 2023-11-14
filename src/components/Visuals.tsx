import clsx from 'clsx';

import classes from './Visuals.module.scss';

const Visuals = () => {
  return (
    <div className={classes.visuals}>
      <div className={clsx(classes.background, classes.backgroundUpper)}></div>
      <div className={clsx(classes.background, classes.backgroundBottom)}></div>
    </div>
  );
};

export default Visuals;
