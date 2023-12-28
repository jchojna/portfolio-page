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

const getMenuButtonTranslation = (
  buttonIndex: number,
  activeButtonIndex: number,
  buttonElement: HTMLAnchorElement
) => {
  const GAP = 10;
  const buttonHeight = buttonElement.clientHeight + GAP;
  const buttonTopOffset = buttonElement.getBoundingClientRect().top;
  const upwardTranslation =
    -buttonTopOffset - (activeButtonIndex - buttonIndex) * buttonHeight;

  return buttonIndex <= activeButtonIndex
    ? upwardTranslation
    : window.innerHeight + upwardTranslation - buttonHeight;
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
  isMenuButtonClicked,
  setIsMenuButtonClicked,
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
    if (!buttonRef.current) return;
    if (!isMenuMode) {
      // if (!isMenuButtonClicked) return;
      // update indicator's position
      isActive &&
        setIndicatorTopOffset(buttonRef.current.getBoundingClientRect().top);
      // update menu button's position
      if (index === currentSectionIndex) {
        const offset =
          buttonRef.current.getBoundingClientRect().top +
          buttonRef.current.clientHeight;
        setBackgroundSplit(offset);
      }
      const buttonRefNode = buttonRef.current;
      setTimeout(() => {
        buttonRefNode.style.transform = `translateY(${getMenuButtonTranslation(
          index,
          currentSectionIndex,
          buttonRefNode
        )}px)`;
        console.log(
          getMenuButtonTranslation(index, currentSectionIndex, buttonRefNode)
        );
      }, 500);
    } else {
      buttonRef.current.style.transform = 'translateY(0)';
    }
  }, [currentSectionIndex, isMenuMode]);

  const handleClick = (index: number) => {
    setCurrentSectionIndex(index);
    setIsMenuButtonClicked(true);
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

export default MobileMenuButton;
