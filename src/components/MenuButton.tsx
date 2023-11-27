import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { menuItems } from '../content/menu';
import menuSvg from '../assets/svg/menu.svg';

import classes from './MenuButton.module.scss';

type MenuButtonProps = {
  label: string;
  width: number;
  isIntro: boolean;
  isHovered: boolean;
  isActive?: boolean;
  currentSectionIndex: number;
  relativeTopOffset: number;
};

const MenuButton = ({
  label,
  width,
  isIntro,
  isHovered,
  isActive,
  currentSectionIndex,
  relativeTopOffset,
}: MenuButtonProps) => {
  const [backgroundSection, setBackgroundSection] = useState<string>('about');

  const viewBox = `0 0 ${width} 100`;
  const buttonClass = clsx({
    [classes.menuButton]: true,
    [classes[backgroundSection]]: true,
    [classes.intro]: isIntro,
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
    const { top } = buttonRef.current.getBoundingClientRect();
    const offset = relativeTopOffset - top;
    const index = offset >= 0 ? currentSectionIndex : currentSectionIndex + 1;
    const sections = menuItems.map(({ label }) => label);
    setBackgroundSection((prevState) =>
      prevState === sections[index] ? prevState : sections[index]
    );
  }, [relativeTopOffset]);

  return (
    <a ref={buttonRef} href={`#${label}`} className={buttonClass}>
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
