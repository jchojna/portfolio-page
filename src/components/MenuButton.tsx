import clsx from 'clsx';

import menuSvg from '../assets/svg/menu.svg';

import classes from './MenuButton.module.scss';

type MenuButtonProps = {
  label: string;
  width: number;
  isHovered: boolean;
  isActive?: boolean;
};

const MenuButton = ({ label, width, isHovered, isActive }: MenuButtonProps) => {
  const viewBox = `0 0 ${width} 100`;
  const buttonClass = clsx({
    [classes.menuButton]: true,
    [classes[label]]: true,
    [classes.intro]: true,
    [classes.hovered]: isHovered,
    [classes.active]: isActive,
  });
  const shadowClass = clsx({
    [classes.menuSvgShadow]: true,
    [classes.visible]: !isActive,
  });
  return (
    <button className={buttonClass}>
      <div className={classes.menuSvg}>
        <svg className={classes.menuSvgText} viewBox={viewBox}>
          <use href={`${menuSvg}#${label}`}></use>
        </svg>
        <svg className={shadowClass} viewBox={viewBox}>
          <use href={`${menuSvg}#${label}-shadow`}></use>
        </svg>
      </div>
    </button>
  );
};

export default MenuButton;
