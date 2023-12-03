import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import menuItems from '../content/menu.json';
import MobileMenuButton from './MobileMenuButton';
import MenuBackground from './MenuBackground';

import classes from './MobileMenu.module.scss';
import Burger from './Burger';

type MobileMenuProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
};

const MobileMenu = ({ isMenuMode, setMenuMode }: MobileMenuProps) => {
  const [indicatorTopOffset, setIndicatorTopOffset] = useState<number>(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [backgroundSplit, setBackgroundSplit] = useState<number>(0);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const menuClass = clsx(classes.menu, isMenuMode && classes.intro);
  const activeView = menuItems.map(({ label }) => label)[currentSectionIndex];

  useEffect(() => {
    if (!indicatorRef.current) return;
    if (!isMenuMode) {
      const indicatorRefElement = indicatorRef.current;
      indicatorRefElement.style.top = `${indicatorTopOffset}px`;
      setTimeout(() => {
        indicatorRefElement.style.top = '0px';
      }, 500);
    } else {
      indicatorRef.current.style.top = `${
        backgroundSplit - indicatorRef.current?.clientHeight
      }px`;
    }
  }, [indicatorTopOffset, isMenuMode]);

  return (
    <>
      <MenuBackground
        isMenuMode={isMenuMode}
        backgroundSplit={backgroundSplit}
        activeView={activeView}
      />
      <div
        ref={indicatorRef}
        className={clsx(
          classes.indicator,
          classes[activeView],
          isMenuMode && classes.visible
        )}
      ></div>
      <nav className={menuClass}>
        <ul className={classes.menuList}>
          {menuItems.map(({ label, width }, index) => {
            return (
              <li
                key={index}
                className={classes.menuItem}
                onClick={() => setMenuMode(false)}
              >
                <MobileMenuButton
                  index={index}
                  label={label}
                  width={width}
                  isMenuMode={isMenuMode}
                  isActive={currentSectionIndex === index}
                  currentSectionIndex={currentSectionIndex}
                  setCurrentSectionIndex={setCurrentSectionIndex}
                  setIndicatorTopOffset={setIndicatorTopOffset}
                  backgroundSplit={backgroundSplit}
                  setBackgroundSplit={setBackgroundSplit}
                />
              </li>
            );
          })}
        </ul>
      </nav>
      <Burger
        activeView={activeView}
        isMenuMode={isMenuMode}
        setMenuMode={setMenuMode}
      />
    </>
  );
};

export default MobileMenu;
