import clsx from 'clsx';
import { useContext, useEffect, useRef } from 'react';

import menuItems from '../content/menu.json';
import {
  getCurrentSectionIndex,
  handleIndicator,
  updateIndicatorStyle,
} from '../utils/utils';
import CurrentViewContext from '../views/CurrentViewContext';
import MenuButton from './MenuButton';

import classes from './Menu.module.scss';

type MenuProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
  backgroundSection: string;
  setBackgroundSection: (backgroundSection: string) => void;
  setIndicatorRef: (indicatorRef: HTMLDivElement | null) => void;
};

const Menu = ({
  isMenuMode,
  setMenuMode,
  sectionsRef,
  setIndicatorRef,
}: MenuProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] =
    useContext(CurrentViewContext);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);

  const handleScroll = () => {
    if (!sectionsRef.current) return;
    const sectionsNodes = sectionsRef.current
      .children as HTMLCollectionOf<HTMLElement>;
    const sectionsScrolls = [...sectionsNodes].map((node) => node.offsetTop);
    const currentIndex = getCurrentSectionIndex(
      Math.ceil(sectionsRef.current.scrollTop),
      sectionsScrolls
    );
    setCurrentSectionIndex(currentIndex);
  };

  useEffect(() => {
    setIndicatorRef(indicatorRef.current);
    const sectionsRefCopy = sectionsRef.current;
    if (sectionsRefCopy) {
      sectionsRefCopy.addEventListener('scroll', handleScroll);
      return () => sectionsRefCopy.removeEventListener('scroll', handleScroll);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('resize', handleIndicator);
    return () => window.removeEventListener('resize', handleIndicator);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // handle indicator position
  useEffect(() => {
    if (!indicatorRef.current) return;
    if (!menuListRef.current) return;
    const indicator = indicatorRef.current;
    const { top, height } =
      menuListRef.current.children[currentSectionIndex].getBoundingClientRect();
    updateIndicatorStyle(indicator, isMenuMode, top, height);
  }, [currentSectionIndex, isMenuMode]);

  const menuClass = clsx({
    [classes.menu]: true,
    [classes.intro]: isMenuMode,
  });

  return (
    <>
      <div
        ref={indicatorRef}
        data-id="indicator"
        className={clsx(
          classes.indicator,
          isMenuMode && classes.intro,
          classes[menuItems[currentSectionIndex].label]
        )}
      ></div>
      <nav className={menuClass}>
        <ul ref={menuListRef} className={classes.menuList}>
          {menuItems.map(({ label, width }, index) => {
            return (
              <li
                key={index}
                className={classes.menuItem}
                onMouseEnter={() => {
                  isMenuMode && setCurrentSectionIndex(index);
                }}
              >
                <MenuButton
                  index={index}
                  label={label}
                  width={width}
                  isMenuMode={isMenuMode}
                  isActive={currentSectionIndex === index}
                  sectionsRef={sectionsRef}
                  setMenuMode={setMenuMode}
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
