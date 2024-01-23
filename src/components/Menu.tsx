import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import menuItems from '../content/menu.json';
import MenuButton from './MenuButton';

import classes from './Menu.module.scss';

import {
  getCurrentSectionIndex,
  getOffsetedSectionIndex,
  getRelativeTopOffset,
} from '../utils/utils';

type MenuProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
  currentSectionIndex: number;
  setCurrentSectionIndex: (index: number) => void;
  backgroundSection: string;
  setBackgroundSection: (backgroundSection: string) => void;
};

const Menu = ({
  isMenuMode,
  setMenuMode,
  sectionsRef,
  currentSectionIndex,
  setCurrentSectionIndex,
  backgroundSection,
  setBackgroundSection,
}: MenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);
  const [offsetedSectionIndex, setOffsetedSectionIndex] = useState<number>(-1);
  const [relativeTopOffset, setRelativeTopOffset] = useState<number>(0);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const hoveredItemName = menuItems.map(({ label }) => label)[hoveredItem || 0];

  const handleScroll = () => {
    if (!sectionsRef.current) return;
    const sectionsNodes = sectionsRef.current
      .children as HTMLCollectionOf<HTMLElement>;
    const sectionsScrolls = [...sectionsNodes].map((node) => node.offsetTop);
    const currentIndex = getCurrentSectionIndex(
      Math.ceil(sectionsRef.current.scrollTop),
      sectionsScrolls
    );
    const offsetedIndex = getOffsetedSectionIndex(
      Math.ceil(sectionsRef.current.scrollTop),
      sectionsScrolls
    );
    const offset =
      getRelativeTopOffset(
        Math.ceil(sectionsRef.current.scrollTop),
        sectionsScrolls
      ) || window.innerHeight;
    setCurrentSectionIndex(currentIndex);
    setOffsetedSectionIndex(offsetedIndex);
    setRelativeTopOffset(offset);
  };

  useEffect(() => {
    const sectionsRefCopy = sectionsRef.current;
    if (sectionsRefCopy) {
      sectionsRefCopy.addEventListener('scroll', handleScroll);
      return () => sectionsRefCopy.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // handle indicator position
  useEffect(() => {
    if (!indicatorRef.current) return;
    if (!menuListRef.current) return;
    const indicator = indicatorRef.current;
    if (isMenuMode) {
      const { top, width, height, left } =
        menuListRef.current.children[
          hoveredItem ? hoveredItem : currentSectionIndex
        ].getBoundingClientRect();
      indicator.style.top = `${top}px`;
      indicator.style.left = `${left + width + 20}px`;
      indicator.style.height = `${height}px`;
      indicator.style.width = `${height}px`;
    } else {
      const { top } =
        menuListRef.current.children[
          currentSectionIndex
        ].getBoundingClientRect();
      indicator.style.top = `${top}px`;
      indicator.style.left = '0px';
      indicator.style.width = '20px';
    }
  }, [hoveredItem, currentSectionIndex, isMenuMode]);

  const menuClass = clsx({
    [classes.menu]: true,
    [classes.intro]: isMenuMode,
  });

  return (
    <>
      <div
        ref={indicatorRef}
        className={clsx(
          classes.indicator,
          classes[hoveredItemName],
          isMenuMode && classes.intro
          // isMenuMode && classes.visible
        )}
      ></div>
      <nav className={menuClass}>
        <ul ref={menuListRef} className={classes.menuList}>
          {menuItems.map(({ label, width }, index) => {
            return (
              <li
                key={index}
                className={classes.menuItem}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => !isMenuMode && setHoveredItem(null)}
              >
                <MenuButton
                  index={index}
                  label={label}
                  width={width}
                  isMenuMode={isMenuMode}
                  isHovered={hoveredItem === index}
                  isActive={currentSectionIndex === index}
                  sectionsRef={sectionsRef}
                  setMenuMode={setMenuMode}
                  backgroundSection={backgroundSection}
                  setBackgroundSection={setBackgroundSection}
                  setCurrentSectionIndex={setCurrentSectionIndex}
                  offsetedSectionIndex={offsetedSectionIndex}
                  relativeTopOffset={relativeTopOffset}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Menu;
