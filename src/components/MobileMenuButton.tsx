import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import menuSvg from '../assets/svg/menu.svg';

import classes from './MenuButton.module.scss';

type MenuButtonProps = {
  index: number;
  label: string;
  width: number;
  isMenuMode: boolean;
  isHovered: boolean;
  isActive?: boolean;
  currentSectionIndex: number;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
  setIndicatorTopOffset: (offset: number) => void;
  setBackgroundSplit: (backgroundSplit: number) => void;
};

const MenuButton = ({
  index,
  label,
  width,
  isMenuMode,
  isHovered,
  isActive,
  currentSectionIndex,
  setCurrentSectionIndex,
  setIndicatorTopOffset,
  setBackgroundSplit,
}: MenuButtonProps) => {
  const viewBox = `0 0 ${width} 100`;
  const buttonClass = clsx({
    [classes.menuButton]: true,
    [classes.intro]: isMenuMode,
    [classes.hovered]: isHovered,
    [classes.active]: isActive,
  });
  const shadowClass = clsx({
    [classes.menuSvgShadow]: true,
    [classes.visible]: !isActive,
  });
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    const backgroundSplitOffset =
      buttonRef.current.getBoundingClientRect().top +
      buttonRef.current.clientHeight;
    isActive && setIndicatorTopOffset(buttonRef.current.offsetTop);
    if (index === currentSectionIndex) {
      setBackgroundSplit(backgroundSplitOffset);
    }
  }, [currentSectionIndex]);

  const handleClick = (index: number) => {
    setCurrentSectionIndex(index);
  };

  return (
    <a
      ref={buttonRef}
      href={`#${label}`}
      className={buttonClass}
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
