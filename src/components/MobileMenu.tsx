import clsx from 'clsx';
import { useState } from 'react';

import menuItems from '../content/menu.json';
import MobileMenuButton from './MobileMenuButton';

import MenuBackground from './MenuBackground';

import classes from './MobileMenu.module.scss';

type MobileMenuProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
};

const MobileMenu = ({ isMenuMode, setMenuMode }: MobileMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);
  const [indicatorTopOffset, setIndicatorTopOffset] = useState<number>(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [backgroundSplit, setBackgroundSplit] = useState<number>(0);

  const menuClass = clsx({
    [classes.menu]: true,
    [classes.intro]: isMenuMode,
  });

  return (
    <>
      <MenuBackground
        isMenuMode={isMenuMode}
        backgroundSplit={backgroundSplit}
      />
      <nav className={menuClass}>
        <div
          className={classes.indicator}
          style={{ top: `${indicatorTopOffset}px` }}
        ></div>
        <ul className={classes.menuList}>
          {menuItems.map(({ label, width }, index) => {
            return (
              <li
                key={index}
                className={classes.menuItem}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => !isMenuMode && setHoveredItem(null)}
                onClick={() => setMenuMode(false)}
              >
                <MobileMenuButton
                  index={index}
                  label={label}
                  width={width}
                  isMenuMode={isMenuMode}
                  isHovered={hoveredItem === index}
                  isActive={currentSectionIndex === index}
                  currentSectionIndex={currentSectionIndex}
                  setCurrentSectionIndex={setCurrentSectionIndex}
                  setIndicatorTopOffset={setIndicatorTopOffset}
                  setBackgroundSplit={setBackgroundSplit}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;
