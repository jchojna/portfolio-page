import clsx from 'clsx';

import classes from './Visuals.module.scss';

type Visuals = {
  isIntro: boolean;
};

const Visuals = ({ isIntro }: Visuals) => {
  const visualsClass = clsx({
    [classes.visuals]: true,
    [classes.visible]: isIntro,
  });

  return (
    <div className={visualsClass}>
      <div className={clsx(classes.background, classes.backgroundUpper)}></div>
      <div className={clsx(classes.background, classes.backgroundBottom)}></div>
    </div>
  );
};

export default Visuals;
