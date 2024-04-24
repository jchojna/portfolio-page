import clsx from 'clsx';
import { useContext, useRef } from 'react';

import menuSvg from '../assets/svg/menu.svg';
import { scrollToSection } from '../utils/utils';
import CurrentViewContext from '../views/CurrentViewContext';

import classes from './MenuButton.module.scss';

type MenuButtonProps = {
  index: number;
  label: string;
  width: number;
  isMenuMode: boolean;
  isActive?: boolean;
  sectionsRef: React.RefObject<HTMLDivElement>;
  setMenuMode: (isMenuMode: boolean) => void;
};

const MenuButton = ({
  index,
  label,
  width,
  isMenuMode,
  isActive,
  setMenuMode,
  sectionsRef,
}: MenuButtonProps) => {
  const viewBox = `0 0 ${width} 100`;
  const buttonClass = clsx({
    [classes.menuButton]: true,
    [classes.intro]: isMenuMode,
    [classes[label]]: true,
    [classes.active]: isActive,
  });
  const shadowClass = clsx({
    [classes.menuSvgShadow]: true,
    [classes.visible]: !isActive,
  });
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const [_, setCurrentSectionIndex] = useContext(CurrentViewContext);

  const handleClick = (index: number) => {
    scrollToSection(sectionsRef, index, !isMenuMode);
    setCurrentSectionIndex(index);
    setMenuMode(false);
  };

  return (
    <a
      ref={buttonRef}
      className={buttonClass}
      data-button-active={isActive}
      data-menu-mode={isMenuMode}
      onClick={() => handleClick(index)}
    >
      <div className={classes.menuSvg}>
        <svg className={classes.menuSvgText} viewBox={viewBox}>
          <use href={`${menuSvg}#${label}`}></use>
        </svg>
        <svg className={shadowClass} viewBox={viewBox}>
          <use href={`${menuSvg}#${label}-shadow`}></use>
        </svg>
      </div>
    </a>
  );
};

export default MenuButton;
