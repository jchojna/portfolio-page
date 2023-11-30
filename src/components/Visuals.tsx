import clsx from 'clsx';

import classes from './Visuals.module.scss';

type Visuals = {
  isMenuMode: boolean;
};

const Visuals = ({ isMenuMode }: Visuals) => {
  const visualsClass = clsx({
    [classes.visuals]: true,
    [classes.visible]: isMenuMode,
  });

  return (
    <div className={visualsClass}>
      <div className={clsx(classes.background, classes.backgroundUpper)}></div>
      <div className={clsx(classes.background, classes.backgroundBottom)}></div>
    </div>
  );
};

export default Visuals;
