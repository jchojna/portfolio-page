import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import menuSvg from '../assets/svg/menu.svg';

import classes from './MobileMenuButton.module.scss';

type MobileMenuButtonProps = {
  index: number;
  label: string;
  width: number;
  isMenuMode: boolean;
  isActive?: boolean;
  currentSectionIndex: number;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
  setIndicatorTopOffset: (offset: number) => void;
  setBackgroundSplit: (backgroundSplit: number) => void;
};

const MobileMenuButton = ({
  index,
  label,
  width,
  isMenuMode,
  isActive,
  currentSectionIndex,
  setCurrentSectionIndex,
  setIndicatorTopOffset,
  setBackgroundSplit,
}: MobileMenuButtonProps) => {
  const viewBox = `0 0 ${width} 100`;
  const buttonClass = clsx({
    [classes.menuButton]: true,
    [classes.intro]: isMenuMode,
    [classes.active]: isActive,
    [classes[label]]: true,
  });
  const shadowClass = clsx({
    [classes.menuSvgShadow]: true,
    [classes.visible]: !isActive,
  });
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    isActive &&
      setIndicatorTopOffset(buttonRef.current.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    if (buttonRef.current) moveMenuButtonsToTop(buttonRef);
  }, []);

  // reset menu button's position on burger button click
  useEffect(() => {
    if (!buttonRef.current) return;
    if (isMenuMode) {
      buttonRef.current.style.transform = 'translateY(0)';
    } else {
      const buttonRefNode = buttonRef.current;
      // update menu button's position
      setTimeout(() => {
        buttonRefNode.style.transform = `translateY(
          ${-buttonRefNode.getBoundingClientRect().top}px
        )`;
      }, 500);
    }
  }, [isMenuMode]);

  const moveMenuButtonsToTop = (btnRef) => {
    // update indicator's position
    setIndicatorTopOffset(btnRef.current.getBoundingClientRect().top);
    const offset =
      btnRef.current.getBoundingClientRect().top + btnRef.current.clientHeight;
    setBackgroundSplit(offset);
  };

  const handleButtonClick = (index: number) => {
    setCurrentSectionIndex(index);
    // if (buttonRef.current) moveMenuButtonsToTop(buttonRef);
  };

  return (
    <a
      ref={buttonRef}
      href={`#${label}`}
      className={buttonClass}
      onClick={() => handleButtonClick(index)}
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

export default MobileMenuButton;
