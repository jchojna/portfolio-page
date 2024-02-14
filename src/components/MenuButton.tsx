import clsx from 'clsx';
import { useContext, useEffect, useRef } from 'react';

import menuSvg from '../assets/svg/menu.svg';
import menuItems from '../content/menu.json';
import { scrollToSection } from '../utils/utils';
import CurrentViewContext from '../views/CurrentViewContext';

import classes from './MenuButton.module.scss';

type MenuButtonProps = {
  index: number;
  label: string;
  width: number;
  isMenuMode: boolean;
  isHovered: boolean;
  isActive?: boolean;
  offsetedSectionIndex: number;
  relativeTopOffset: number;
  sectionsRef: React.RefObject<HTMLDivElement>;
  backgroundSection: string;
  setBackgroundSection: (backgroundSection: string) => void;
  setMenuMode: (isMenuMode: boolean) => void;
};

const MenuButton = ({
  index,
  label,
  width,
  isMenuMode,
  isHovered,
  isActive,
  offsetedSectionIndex,
  relativeTopOffset,
  setMenuMode,
  sectionsRef,
  backgroundSection,
  setBackgroundSection,
}: MenuButtonProps) => {
  const viewBox = `0 0 ${width} 100`;
  const buttonClass = clsx({
    [classes.menuButton]: true,
    [classes[backgroundSection]]: !isMenuMode,
    [classes.intro]: isMenuMode,
    [classes.hovered]: isHovered,
    [classes[label]]: isHovered && isMenuMode,
    [classes.active]: isActive,
  });
  const shadowClass = clsx({
    [classes.menuSvgShadow]: true,
    [classes.visible]: !isActive,
  });
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const [_, setCurrentSectionIndex] = useContext(CurrentViewContext);

  useEffect(() => {
    if (!buttonRef.current) return;
    const { top } = buttonRef.current.getBoundingClientRect();
    const offset = relativeTopOffset - top;
    const index = offset >= 0 ? offsetedSectionIndex : offsetedSectionIndex + 1;
    const sections = menuItems.map(({ label }) => label);
    setBackgroundSection(sections[index]);
  }, [relativeTopOffset]);

  const handleClick = (index: number) => {
    scrollToSection(sectionsRef, index, !isMenuMode);
    setCurrentSectionIndex(index);
    setBackgroundSection(menuItems[index].label);
    setMenuMode(false);
  };

  return (
    <a
      ref={buttonRef}
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
