import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';

import menuSvg from '../assets/svg/menu.svg';
import CurrentViewContext from '../views/CurrentViewContext';

import classes from './MobileMenuButton.module.scss';

type MobileMenuButtonProps = {
  index: number;
  label: string;
  width: number;
  isMenuMode: boolean;
  isActive?: boolean;
  setIndicatorTopOffset: (offset: number) => void;
  setBackgroundSplit: (backgroundSplit: number) => void;
};

const MobileMenuButton = ({
  index,
  label,
  width,
  isMenuMode,
  isActive,
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
  const [yPositionMenuMode, setYPositionMenuMode] = useState<number | null>(
    null
  );
  const [_, setCurrentSectionIndex] = useContext(CurrentViewContext);

  useEffect(() => {
    if (!buttonRef.current) return;
    const offset =
      buttonRef.current.getBoundingClientRect().top +
      buttonRef.current.clientHeight;
    setYPositionMenuMode(offset);
    if (isActive) {
      setIndicatorTopOffset(offset);
      setBackgroundSplit(offset);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // reset menu button's position on burger button click
  useEffect(() => {
    if (!buttonRef.current) return;

    if (yPositionMenuMode !== null && isActive) {
      // set offset of the background split based on active menu button position
      setBackgroundSplit(yPositionMenuMode);
      // update indicator's position
      setIndicatorTopOffset(yPositionMenuMode - buttonRef.current.clientHeight);
    }

    // update translation value of the menu buttons
    if (isMenuMode) {
      // move menu buttons to their initial positions
      buttonRef.current.style.transform = 'translateY(0)';
    } else {
      const buttonRefNode = buttonRef.current;
      // move menu buttons to the top
      setTimeout(() => {
        buttonRefNode.style.transform = `translateY(
          ${-buttonRefNode.getBoundingClientRect().top}px
        )`;
      }, 500);
    }
  }, [isMenuMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleButtonClick = (index: number) => {
    setCurrentSectionIndex(index);
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
