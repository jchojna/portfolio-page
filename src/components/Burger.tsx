import clsx from 'clsx';

import classes from './Burger.module.scss';

type BurgerProps = {
  activeView: string;
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
};

const Burger = ({ activeView, isMenuMode, setMenuMode }: BurgerProps) => {
  return (
    <button
      className={clsx(
        classes.burger,
        !isMenuMode && classes.visible,
        classes[activeView]
      )}
      onClick={() => setMenuMode(!isMenuMode)}
    >
      <svg className={classes.svg} viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="10"></rect>
        <rect x="20" y="45" width="60" height="10"></rect>
        <rect x="20" y="70" width="60" height="10"></rect>
      </svg>
    </button>
  );
};

export default Burger;
