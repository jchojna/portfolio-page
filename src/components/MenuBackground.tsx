import clsx from 'clsx';

import classes from './MenuBackground.module.scss';

type MenuBackgroundProps = {
  isMenuMode: boolean;
};

const MenuBackground = ({ isMenuMode }: MenuBackgroundProps) => {
  const containerClass = clsx({
    [classes.container]: true,
    [classes.visible]: isMenuMode,
  });

  return (
    <div className={containerClass}>
      <div className={clsx(classes.background, classes.upper)}></div>
      <div className={clsx(classes.background, classes.bottom)}></div>
    </div>
  );
};

export default MenuBackground;
